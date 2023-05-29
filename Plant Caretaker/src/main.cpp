#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
constexpr char ssid[] = "TP-Link_2908";
constexpr char password[] = "97571803";

constexpr int MC_ID = 1;
const String API_KEY = "aE6B5CXrIMeU85MzXP3HHWHCZcvvhOegFz6K4qvN79vhAzFu388wAg==";
const String API_AUTH_PARAM = String("?code=") + API_KEY;

const String API_MEASUREMENTS = "https://plants-function-app.azurewebsites.net/api/InsertMeasurmentsTrigger" + API_AUTH_PARAM;
const String API_MC_DATA = "https://plants-function-app.azurewebsites.net/api/mcData" + String("/") + String(MC_ID) + String("/") + API_AUTH_PARAM;
const String API_PLANTS_HISTORY = "https://plants-function-app.azurewebsites.net/api/InsertPlantsHistory" + API_AUTH_PARAM;

constexpr uint32_t WIFI_TIMEOUT = 300 * 1000;
constexpr uint64_t MEASUREMENTS_TIME = (uint64_t)30 * 60 * 1000000; // 0.5 hour
constexpr uint64_t MC_DATA_TIME = (uint64_t)60 * 1000000;           // 1 minute
constexpr uint64_t CHECK_TIME = (uint64_t)60 * 60 * 1000000;        // 1 hour

constexpr uint8_t MAX_SENSORS_NO = 4;
constexpr uint8_t HUMIDITY_SENSOR_PIN[MAX_SENSORS_NO] = {36, 39, 34, 35}; // 36 - VP pin, 39 - VN pin
constexpr uint8_t VALVE_PIN[MAX_SENSORS_NO] = {13, 12, 16, 17};           // 16 - RX pin, 17 - TX pin
constexpr uint8_t PUMP_PIN[MAX_SENSORS_NO / 2] = {14, 5};
constexpr uint16_t DRY_WET_HUMIDITY_CONST[MAX_SENSORS_NO][2] = {{2643, 879}, {2657, 944}, {2654, 964}, {2657, 909}};

constexpr uint8_t HUMIDITY_VALUES_ARRAY_SIZE = 10;
uint16_t humidityValuesArray[MAX_SENSORS_NO][HUMIDITY_VALUES_ARRAY_SIZE];

bool isWateringLineConnected[MAX_SENSORS_NO];
uint8_t criticalHumidity[MAX_SENSORS_NO];
uint16_t wateringMl[MAX_SENSORS_NO], fertelizationMl[MAX_SENSORS_NO]; // TODO
bool wateringDaysElapsed[MAX_SENSORS_NO], fertelizationDaysElapsed[MAX_SENSORS_NO];
bool isPlantToWater[MAX_SENSORS_NO], isPlantToFertilize[MAX_SENSORS_NO];

hw_timer_t *measurementsTimer = NULL;
volatile SemaphoreHandle_t measurementsTimerSemaphore;

hw_timer_t *mcDataTimer = NULL;
volatile SemaphoreHandle_t mcDataTimerSemaphore;

hw_timer_t *checkPlantsTimer = NULL;
volatile SemaphoreHandle_t checkPlantsTimerSemaphore;

hw_timer_t *waterPlantsTimer = NULL;
volatile SemaphoreHandle_t waterPlantsTimerSemaphore;

// put function declarations here:
bool connectWifi();
String getJsonString(const uint8_t humidities[]);
void sendMeasurementsToApi(const String serverPath, const String jsonString);
uint16_t average(const uint16_t array[], const uint8_t size);
uint8_t getHumidty(const uint8_t sensor);
void parseJsonObject(const String httpString);
void getMcDataFromApi(const String serverPath);
uint64_t getWateringTime(const uint8_t sensor);
void startWatering(const uint8_t sensorId);
void stopWatering(const uint8_t sensorId);
String getWateringMlParam(const uint8_t sensorId);
String getFertilizationMlParam(const uint8_t sensorId);
void sendPlantHistoryToApi(const String serverPath, const String additionalParam, const uint8_t sensorId);
int16_t getFirstPlantToWater();
void IRAM_ATTR onMeasurementsTimer();
void IRAM_ATTR onMcDataTimer();
void IRAM_ATTR onCheckTimer();
void IRAM_ATTR onWaterPlantsTimer();

void setup()
{
  Serial.begin(115200);
  analogReadResolution(12);
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
  {
    adcAttachPin(HUMIDITY_SENSOR_PIN[i]);
    pinMode(VALVE_PIN[i], OUTPUT);
  }
  for (int i = 0; i < MAX_SENSORS_NO / 2; ++i)
  {
    pinMode(PUMP_PIN[i], OUTPUT);
  }
  connectWifi();

  // Insert Measurements Timer
  measurementsTimerSemaphore = xSemaphoreCreateBinary();
  measurementsTimer = timerBegin(0, 80, true);
  timerAttachInterrupt(measurementsTimer, &onMeasurementsTimer, true);
  timerAlarmWrite(measurementsTimer, MEASUREMENTS_TIME, true);
  timerAlarmEnable(measurementsTimer);

  // Get Microcontroller Data Timer
  mcDataTimerSemaphore = xSemaphoreCreateBinary();
  mcDataTimer = timerBegin(1, 80, true);
  timerAttachInterrupt(mcDataTimer, &onMcDataTimer, true);
  timerAlarmWrite(mcDataTimer, MC_DATA_TIME, true);
  timerAlarmEnable(mcDataTimer);

  // Check Plants Timer
  checkPlantsTimerSemaphore = xSemaphoreCreateBinary();
  checkPlantsTimer = timerBegin(2, 80, true);
  timerAttachInterrupt(checkPlantsTimer, &onCheckTimer, true);
  timerAlarmWrite(checkPlantsTimer, CHECK_TIME, true);
  timerAlarmEnable(checkPlantsTimer);

  // Water plants Timer
  waterPlantsTimerSemaphore = xSemaphoreCreateBinary();
  waterPlantsTimer = timerBegin(3, 80, true);
  timerAttachInterrupt(waterPlantsTimer, &onWaterPlantsTimer, true);
}

void loop()
{
  uint8_t humidities[MAX_SENSORS_NO];
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
    if (isWateringLineConnected[i])
      humidities[i] = getHumidty(i);

  if (xSemaphoreTake(waterPlantsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println("Watering Alarm Fired!");
    int16_t firstPlantToWater = getFirstPlantToWater();
    stopWatering(firstPlantToWater);
    isPlantToWater[firstPlantToWater] = false;
    firstPlantToWater = getFirstPlantToWater();
    if (firstPlantToWater > -1)
    {
      Serial.print("firstPlantToWater: ");
      Serial.println(firstPlantToWater);
      startWatering(firstPlantToWater);
    }
  }
  if (xSemaphoreTake(checkPlantsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println("Check Alarm Fired!");
    for (int i = 0; i < MAX_SENSORS_NO; ++i)
    {
      if (!isWateringLineConnected[i])
        continue;
      Serial.print("Humidity: ");
      Serial.println(humidities[i]);
      Serial.print("criticalHumidity: ");
      Serial.println(criticalHumidity[i]);
      Serial.print("wateringDaysElapsed: ");
      Serial.println(wateringDaysElapsed[i]);
      if (humidities[i] < criticalHumidity[i] || wateringDaysElapsed[i])
      {
        isPlantToWater[i] = true;
      }
      if (fertelizationDaysElapsed[i])
      {
        isPlantToFertilize[i] = true;
      }
    }
    int16_t firstPlantToWater = getFirstPlantToWater();
    if (firstPlantToWater > -1)
    {
      Serial.print("firstPlantToWater: ");
      Serial.println(firstPlantToWater);
      startWatering(firstPlantToWater);
    }
  }
  if (xSemaphoreTake(measurementsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println("Measurements Timer Alarm Fired!");
    if (WiFi.status() == WL_CONNECTED)
    {
      sendMeasurementsToApi(API_MEASUREMENTS, getJsonString(humidities));
    }
    else
    {
      Serial.println("WiFi Disconnected");
      if (connectWifi())
        sendMeasurementsToApi(API_MEASUREMENTS, getJsonString(humidities));
    }
  }
  if (xSemaphoreTake(mcDataTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println("Get microcontroller Data Timer Alarm Fired!");
    if (WiFi.status() == WL_CONNECTED)
    {
      getMcDataFromApi(API_MC_DATA);
    }
    else
    {
      Serial.println("WiFi Disconnected");
      if (connectWifi())
        getMcDataFromApi(API_MC_DATA);
    }
    for (int i = 0; i < MAX_SENSORS_NO; ++i)
      if (isWateringLineConnected[i])
        Serial.printf("Humidity%d = %d\n", i, humidities[i]);
  }

  delay(1000);
}

bool connectWifi()
{
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  uint64_t startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < WIFI_TIMEOUT)
  {
    delay(500);
    Serial.print(".");
  }
  Serial.println();
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.print("Connected to WiFi network with IP Address: ");
    Serial.println(WiFi.localIP());
  }
  else
  {
    Serial.println("Wifi connection timeout! Failed to connect!");
  }
  return WiFi.status() == WL_CONNECTED;
}

String getJsonString(const uint8_t humidities[])
{
  StaticJsonDocument<256> doc;

  JsonArray outHumidities = doc.createNestedArray("humidities");
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
    if (isWateringLineConnected[i])
      outHumidities[i][String(i)]["humidity"] = humidities[i];
  doc["mcId"] = String(MC_ID);
  String json;
  serializeJson(doc, json);
  return json;
}

void sendMeasurementsToApi(const String serverPath, const String jsonString)
{
  Serial.println(jsonString);
  HTTPClient http;

  http.begin(serverPath.c_str());
  http.addHeader("Content-Type", "application/json");
  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

uint16_t average(const uint16_t array[], const uint8_t size)
{
  uint32_t avg = 0;
  for (int i = 0; i < size; ++i)
  {
    avg += array[i];
  }
  return avg / size;
}

uint8_t getHumidty(const uint8_t sensor)
{
  int humidity = map(analogRead(HUMIDITY_SENSOR_PIN[sensor]), DRY_WET_HUMIDITY_CONST[sensor][0], DRY_WET_HUMIDITY_CONST[sensor][1], 0, 100);
  humidity = min(max(humidity, 0), 100); // Make sure 0<=humidity<=100
  for (int i = HUMIDITY_VALUES_ARRAY_SIZE - 1; i > 0; --i)
    humidityValuesArray[sensor][i] = humidityValuesArray[sensor][i - 1];
  humidityValuesArray[sensor][0] = humidity;
  return average(humidityValuesArray[sensor], HUMIDITY_VALUES_ARRAY_SIZE);
}

void parseJsonObject(const String httpString)
{
  StaticJsonDocument<768> doc;
  DeserializationError error = deserializeJson(doc, httpString);
  if (error)
  {
    Serial.print("deserializeJson() failed: ");
    Serial.println(error.c_str());
    return;
  }
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
  {
    isWateringLineConnected[i] = false;
  }
  for (JsonPair item : doc.as<JsonObject>())
  {
    const char *item_key = item.key().c_str();
    int key = atoi(item_key);
    isWateringLineConnected[key] = true;
    wateringDaysElapsed[key] = item.value()["wateringDaysElapsed"];
    fertelizationDaysElapsed[key] = item.value()["fertelizationDaysElapsed"];
    criticalHumidity[key] = item.value()["criticalHumidity"];
    wateringMl[key] = item.value()["wateringMl"];
  }
}

void getMcDataFromApi(const String serverPath)
{
  HTTPClient http;

  http.begin(serverPath.c_str());

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    parseJsonObject(http.getString());
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

uint64_t getWateringTime(const uint8_t sensor)
{
  uint64_t wateringTime = (uint64_t)((float)wateringMl[sensor] / 4.0f) * 1000000;
  Serial.print("Watering Time: ");
  Serial.print(wateringTime / 1000000);
  Serial.println("s");
  return wateringTime;
}

void startWatering(const uint8_t sensorId)
{
  Serial.println("Started Watering!");
  timerWrite(waterPlantsTimer, 0);
  timerAlarmWrite(waterPlantsTimer, getWateringTime(sensorId), false);
  timerAlarmEnable(waterPlantsTimer);
  digitalWrite(VALVE_PIN[sensorId], HIGH);
  digitalWrite(PUMP_PIN[sensorId / 2], HIGH);
}

void stopWatering(const uint8_t sensorId)
{
  Serial.println("Stoped Watering!");
  digitalWrite(VALVE_PIN[sensorId], LOW);
  digitalWrite(PUMP_PIN[sensorId / 2], LOW);
  sendPlantHistoryToApi(API_PLANTS_HISTORY, getWateringMlParam(sensorId), sensorId);
}

String getWateringMlParam(const uint8_t sensorId)
{
  return String("&watering_ml=") + wateringMl[sensorId];
}

String getFertilizationMlParam(const uint8_t sensorId)
{
  return String("&fertilizing_ml=") + fertelizationMl[sensorId];
}

void sendPlantHistoryToApi(const String serverPath, const String additionalParam, const uint8_t sensorId)
{
  HTTPClient http;

  http.begin(serverPath.c_str() + String("&mcId=") + MC_ID +
             String("&sensorId=") + sensorId +
             additionalParam);
  int httpResponseCode = http.GET();

  if (httpResponseCode > 0)
  {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

int16_t getFirstPlantToWater()
{
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
    if (isPlantToWater[i])
      return i;
  return -1;
}

void IRAM_ATTR onMeasurementsTimer()
{
  xSemaphoreGiveFromISR(measurementsTimerSemaphore, NULL);
}

void IRAM_ATTR onMcDataTimer()
{
  xSemaphoreGiveFromISR(mcDataTimerSemaphore, NULL);
}

void IRAM_ATTR onCheckTimer()
{
  xSemaphoreGiveFromISR(checkPlantsTimerSemaphore, NULL);
}

void IRAM_ATTR onWaterPlantsTimer()
{
  xSemaphoreGiveFromISR(waterPlantsTimerSemaphore, NULL);
}
