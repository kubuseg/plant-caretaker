#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <vector>

constexpr char ssid[] = "TP-Link_2908";
constexpr char password[] = "97571803";

String serverName = "https://plants-function-app.azurewebsites.net/api/InsertMeasurmentsTrigger?code=bJJxu6Op-AXde9VHz23lVGorgXiIPdRS4EIWsLrIOK_YAzFuX0j9TQ==";

unsigned long lastTime = 0;
//Make measurment every hour
constexpr unsigned long timerDelay = 60*60*1000;


constexpr int sensorsNo = 1, maxSensorsNo = 4;
constexpr int humiditySensorPin[maxSensorsNo] = {36, 39}; //VP pin, VN pin

constexpr int dryWetConst[maxSensorsNo][2] = {{2643, 879}, {2657, 944}};

constexpr int arraySize = 10;
int analogValuesArray[maxSensorsNo][arraySize];

void connectWifi() {
  WiFi.begin(ssid, password);
  Serial.println("Connecting");
  while(WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.print("Connected to WiFi network with IP Address: ");
  Serial.println(WiFi.localIP());
}

void setup() {
  Serial.begin(115200);
  analogReadResolution(12);
  for (int i=0; i<sensorsNo; ++i)
    adcAttachPin(humiditySensorPin[i]);
  connectWifi();
}

String getQueryString(const char variableName[], const int values[]) {
  String queryString = "&" + String(variableName) + "=";
  queryString += "[";
  for (int i=0; i<sensorsNo-1; ++i) {
    queryString += values[i] + ",";
  }
  queryString += values[sensorsNo-1];
  queryString += "]";
  return queryString;
}

void sendToApi(String serverPath) {
  HTTPClient http;

  http.begin(serverPath.c_str());
  
  int httpResponseCode = http.GET();
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

int average(int array[]) {
  int avg = 0;
  for (int i=0; i<arraySize; ++i) {
    avg += array[i];
  }
  return avg/arraySize;
}

int getHumidty(const int sensor) {
  int analogValue = analogRead(humiditySensorPin[sensor]);
  for (int i=arraySize-1; i>0; --i)
    analogValuesArray[sensor][i] = analogValuesArray[sensor][i-1];
  analogValuesArray[sensor][0] = analogValue;
  int humidity = map(average(analogValuesArray[sensor]), dryWetConst[sensor][0], dryWetConst[sensor][1], 0, 100);
  humidity = min(max(humidity, 0), 100); //Make sure 0<=humidity<=100
  Serial.printf("Humidity%d = %d\n", sensor, humidity);
  return humidity;
}

void loop() {
  int humidity[sensorsNo];
  for (int i=0; i<sensorsNo; ++i) {
    humidity[i] = getHumidty(i);
  }

  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status() == WL_CONNECTED) {
      sendToApi(serverName + getQueryString("humidities", humidity));
    }
    else {
      Serial.println("WiFi Disconnected");
      connectWifi();
    }
    lastTime = millis();
  }
    delay(1000);
}