#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
constexpr char ssid[] = "2.4G-Vectrafik";
constexpr char password[] = "52625804m";

constexpr int MC_ID = 1;
const String API_KEY = "aE6B5CXrIMeU85MzXP3HHWHCZcvvhOegFz6K4qvN79vhAzFu388wAg==";
const String API_AUTH_PARAM = String("?code=") + API_KEY;

const String API_BASE_URL = "https://plants-app.azurewebsites.net/api";
const String API_MEASUREMENTS = API_BASE_URL + "/InsertMeasurmentsTrigger" + API_AUTH_PARAM;
const String API_MC_DATA = API_BASE_URL + "/mcData" + String("/") + String(MC_ID) + API_AUTH_PARAM;
const String API_PLANTS_HISTORY = API_BASE_URL + "/InsertPlantsHistory" + API_AUTH_PARAM;
const String API_WATER_LEVEL = API_BASE_URL + "/mcInfo" + String("/") + String(MC_ID) + API_AUTH_PARAM;

constexpr uint32_t CONNECTION_TIMEOUT = 60 * 1000; // 1 minute

constexpr bool isTest = true;
constexpr uint64_t MEASUREMENTS_TIME = (uint64_t)1 * 60 * 60 * 1000000; // 1 hours
constexpr uint64_t MC_DATA_TIME = (uint64_t)60 * 60 * 1000000;          // 1 hour
constexpr uint64_t CHECK_TIME = (uint64_t)6 * 60 * 60 * 1000000;        // 6 hours

// constexpr bool isTest = true;
// constexpr uint64_t MEASUREMENTS_TIME = (uint64_t)1 * 60 * 1000000; // 1 minutes
// constexpr uint64_t MC_DATA_TIME = (uint64_t)30 * 1000000;          // 1 minute
// constexpr uint64_t CHECK_TIME = (uint64_t)6 * 60 * 1000000;        // 2 minutes

constexpr uint8_t MAX_SENSORS_NO = 4;
constexpr uint8_t HUMIDITY_SENSOR_PIN[MAX_SENSORS_NO] = {36, 39, 34, 35}; // 36 - VP pin, 39 - VN pin
constexpr uint8_t WATERING_VALVE_PIN[MAX_SENSORS_NO] = {13, 12, 16, 17};  // 16 - RX pin, 17 - TX pin
constexpr uint8_t WATERING_PUMP_PIN[MAX_SENSORS_NO / 2] = {14, 5};
constexpr float PUMP_WATERING_A_COEF[MAX_SENSORS_NO / 2] = {3.6f, 3.04f};
constexpr float PUMP_WATERING_B_COEF[MAX_SENSORS_NO / 2] = {-2.5f, -0.5f};
constexpr uint16_t DRY_WET_HUMIDITY_CONST[MAX_SENSORS_NO][2] = {{2643, 879}, {2657, 944}, {2683, 962}, {2690, 917}};
constexpr uint8_t LEVEL_SENSOR_V = 32;
constexpr uint8_t LEVEL_SENSOR_PIN = 33;
constexpr uint8_t HUMIDITY_VALUES_ARRAY_SIZE = 10;

uint16_t humidityValuesArray[MAX_SENSORS_NO][HUMIDITY_VALUES_ARRAY_SIZE];
uint8_t humidities[MAX_SENSORS_NO];
bool isWateringLineConnected[MAX_SENSORS_NO];
uint8_t criticalHumidity[MAX_SENSORS_NO];
uint16_t wateringMl[MAX_SENSORS_NO];
bool wateringDaysElapsed[MAX_SENSORS_NO];
bool isPlantToWater[MAX_SENSORS_NO];

hw_timer_t *measurementsTimer = NULL;
volatile SemaphoreHandle_t measurementsTimerSemaphore;

hw_timer_t *mcDataTimer = NULL;
volatile SemaphoreHandle_t mcDataTimerSemaphore;

hw_timer_t *checkPlantsTimer = NULL;
volatile SemaphoreHandle_t checkPlantsTimerSemaphore;

hw_timer_t *pumpTimer = NULL;
volatile SemaphoreHandle_t waterPlantsTimerSemaphore;

// put function declarations here:
bool connectToWifi();
const String getHumiditiesSerialized(const uint8_t humidities[]);
const String getWaterLevelAlarmSerialized(const bool waterLevelAlarm);
const String getPlantHistorySerialized(const uint8_t sensorId);
bool sendJson(const String serverPath, const String jsonString);
void sendJsonSafe(const String serverPath, const String jsonString);
uint16_t average(const uint16_t array[], const uint8_t size);
uint8_t getHumidty(const uint8_t sensor);
bool isWaterLevelAlarm();
void parseJsonObject(const String httpString);
bool getMcDataFromApi(const String serverPath);
void getMcDataFromApiSafe(const String serverPath);
uint64_t getPumpTime(const uint16_t ml, const uint16_t pumpId);
void startWatering(const uint8_t sensorId);
void stopWatering(const uint8_t sensorId);
int16_t getFirstPlant(const bool isPlantToWater[MAX_SENSORS_NO]);
void handleWatering();
void stopWatering();
void IRAM_ATTR onMeasurementsTimer();
void IRAM_ATTR onMcDataTimer();
void IRAM_ATTR onCheckTimer();
void IRAM_ATTR onWaterPlantsTimer();

void setup()
{
  if (isTest)
    Serial.begin(115200);

  analogReadResolution(12);
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
  {
    adcAttachPin(HUMIDITY_SENSOR_PIN[i]);
    pinMode(WATERING_VALVE_PIN[i], OUTPUT);
  }
  for (int i = 0; i < MAX_SENSORS_NO / 2; ++i)
  {
    pinMode(WATERING_PUMP_PIN[i], OUTPUT);
  }
  pinMode(LEVEL_SENSOR_PIN, INPUT_PULLDOWN);
  pinMode(LEVEL_SENSOR_V, OUTPUT);
  digitalWrite(LEVEL_SENSOR_V, HIGH);

  connectToWifi();

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
  pumpTimer = timerBegin(3, 80, true);
  timerAttachInterrupt(pumpTimer, &onWaterPlantsTimer, true);

  getMcDataFromApiSafe(API_MC_DATA);
}

void loop()
{
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
  {
    if (isWateringLineConnected[i])
    {
      humidities[i] = getHumidty(i);
    }
  }

  if (xSemaphoreTake(waterPlantsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println();
    Serial.println("Watering Alarm Fired!");
    stopWatering();
    handleWatering();
  }

  if (xSemaphoreTake(checkPlantsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println();
    Serial.println("Check Alarm Fired!");
    bool waterLevelAlarm = isWaterLevelAlarm();
    for (int i = 0; i < MAX_SENSORS_NO; ++i)
    {
      if (waterLevelAlarm)
        break;
      if (!isWateringLineConnected[i])
        continue;
      Serial.print("Plant: ");
      Serial.println(i);
      Serial.print("Humidity: ");
      Serial.print(humidities[i]);
      Serial.print(" | ");
      Serial.print("criticalHumidity: ");
      Serial.print(criticalHumidity[i]);
      Serial.print(" | ");
      Serial.print("wateringDaysElapsed: ");
      Serial.print(wateringDaysElapsed[i]);
      Serial.println();
      if (humidities[i] < criticalHumidity[i] || wateringDaysElapsed[i])
      {
        isPlantToWater[i] = true;
      }
    }
    handleWatering();
  }

  if (xSemaphoreTake(measurementsTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println();
    Serial.println("Measurements Timer Alarm Fired!");
    bool waterLevelAlarm = isWaterLevelAlarm();
    sendJsonSafe(API_MEASUREMENTS, getHumiditiesSerialized(humidities));
    sendJsonSafe(API_WATER_LEVEL, getWaterLevelAlarmSerialized(waterLevelAlarm));
  }

  if (xSemaphoreTake(mcDataTimerSemaphore, 0) == pdTRUE)
  {
    Serial.println();
    getMcDataFromApiSafe(API_MC_DATA);
    for (int i = 0; i < MAX_SENSORS_NO; ++i)
      if (isWateringLineConnected[i])
        Serial.printf("Humidity%d = %d\n", i, humidities[i]);
  }
  delay(1000);
}

bool connectToWifi()
{
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  uint64_t startTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startTime < CONNECTION_TIMEOUT)
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

const String getHumiditiesSerialized(const uint8_t humidities[])
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

const String getWaterLevelAlarmSerialized(const bool waterLevelAlarm)
{
  StaticJsonDocument<16> doc;
  doc["waterLevelAlarm"] = waterLevelAlarm;
  String json;
  serializeJson(doc, json);
  return json;
}

const String getPlantHistorySerialized(const uint8_t sensorId)
{
  StaticJsonDocument<64> doc;
  doc["mcId"] = String(MC_ID);
  doc["sensorId"] = sensorId;
  doc["wateringMl"] = wateringMl[sensorId];
  String json;
  serializeJson(doc, json);
  return json;
}

bool sendJson(const String serverPath, const String jsonString)
{
  HTTPClient http;

  http.begin(serverPath.c_str());
  http.addHeader("Content-Type", "application/json");

  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0)
  {
    Serial.println(jsonString);
    String payload = http.getString();
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return httpResponseCode > 0;
}

void sendJsonSafe(const String serverPath, const String jsonString)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Sending Json");
    uint64_t startTime = millis();
    while (!sendJson(serverPath, jsonString) && millis() - startTime < CONNECTION_TIMEOUT)
    {
      delay(5000);
    }
  }
  else
  {
    Serial.println("WiFi Disconnected");
    if (connectToWifi())
    {
      Serial.println("Sending Json");
      uint64_t startTime = millis();
      while (!sendJson(serverPath, jsonString) && millis() - startTime < CONNECTION_TIMEOUT)
      {
        delay(5000);
      }
    }
  }
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
  humidity = min(max(humidity, 0), 100); // Make sure 0 <= humidity <= 100
  for (int i = HUMIDITY_VALUES_ARRAY_SIZE - 1; i > 0; --i)
    humidityValuesArray[sensor][i] = humidityValuesArray[sensor][i - 1];
  humidityValuesArray[sensor][0] = humidity;
  return average(humidityValuesArray[sensor], HUMIDITY_VALUES_ARRAY_SIZE);
}

bool isWaterLevelAlarm()
{
  return digitalRead(LEVEL_SENSOR_PIN);
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
    criticalHumidity[key] = item.value()["criticalHumidity"];
    wateringMl[key] = item.value()["wateringMl"];
  }
}

bool getMcDataFromApi(const String serverPath)
{
  HTTPClient http;

  http.begin(serverPath.c_str());

  int httpResponseCode = http.GET();

  if (httpResponseCode > 0)
  {
    parseJsonObject(http.getString());
  }
  else
  {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
  return httpResponseCode > 0;
}

void getMcDataFromApiSafe(const String serverPath)
{
  if (WiFi.status() == WL_CONNECTED)
  {
    Serial.println("Getting plants parameters from api");
    uint64_t startTime = millis();
    while (!getMcDataFromApi(serverPath) && millis() - startTime < CONNECTION_TIMEOUT)
    {
      delay(5000);
    }
  }
  else
  {
    Serial.println("WiFi Disconnected");
    if (connectToWifi())
    {
      Serial.println("Getting plants parameters from api");
      uint64_t startTime = millis();
      while (!getMcDataFromApi(serverPath) && millis() - startTime < CONNECTION_TIMEOUT)
      {
        delay(5000);
      }
    }
  }
}

uint64_t getPumpTime(const uint16_t ml, const uint16_t pumpId)
{
  float wateringTimeSec = ((float)ml - PUMP_WATERING_B_COEF[pumpId]) / PUMP_WATERING_A_COEF[pumpId];
  uint64_t wateringTimeMsec = (uint64_t)(wateringTimeSec) * 1000000;
  Serial.print("Pump Time: ");
  Serial.print(wateringTimeMsec / 1000000);
  Serial.println("s");
  return wateringTimeMsec;
}

void startWatering(const uint8_t sensorId)
{
  Serial.println("Started Watering!");
  timerWrite(pumpTimer, 0);
  timerAlarmWrite(pumpTimer, getPumpTime(wateringMl[sensorId], sensorId / 2), false);
  timerAlarmEnable(pumpTimer);
  digitalWrite(WATERING_VALVE_PIN[sensorId], HIGH);
  digitalWrite(WATERING_PUMP_PIN[sensorId / 2], HIGH);
}

void stopWatering(const uint8_t sensorId)
{
  Serial.println("Stoped Watering!");
  digitalWrite(WATERING_VALVE_PIN[sensorId], LOW);
  digitalWrite(WATERING_PUMP_PIN[sensorId / 2], LOW);
  sendJsonSafe(API_PLANTS_HISTORY, getPlantHistorySerialized(sensorId));
}

int16_t getFirstPlant(const bool isPlantToWater[MAX_SENSORS_NO])
{
  for (int i = 0; i < MAX_SENSORS_NO; ++i)
    if (isPlantToWater[i])
      return i;
  return -1;
}

void handleWatering()
{
  int16_t firstPlantToWater = getFirstPlant(isPlantToWater);
  if (firstPlantToWater > -1)
  {
    startWatering(firstPlantToWater);
  }
}

void stopWatering()
{
  int16_t firstPlantToWater = getFirstPlant(isPlantToWater);
  if (firstPlantToWater > -1)
  {
    Serial.print("firstPlantToWater: ");
    Serial.println(firstPlantToWater);
    stopWatering(firstPlantToWater);
    isPlantToWater[firstPlantToWater] = false;
  }
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
