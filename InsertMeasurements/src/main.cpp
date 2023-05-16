#include <Arduino.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <vector>

constexpr char ssid[] = "TP-Link_2908";
constexpr char password[] = "97571803";

String serverName = "https://plants-function-app.azurewebsites.net/api/InsertMeasurmentsTrigger?code=bJJxu6Op-AXde9VHz23lVGorgXiIPdRS4EIWsLrIOK_YAzFuX0j9TQ==";

unsigned long lastTime = 0;
//Make measurment every hour
constexpr unsigned long timerDelay = 60*1000;
//VP pin
constexpr int humiditySensorInput0 = 36;
//VN pin
constexpr int humiditySensorInput1 = 39;

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
  adcAttachPin(humiditySensorInput0);
  adcAttachPin(humiditySensorInput1);
  connectWifi();
}

constexpr int drySensor0 = 2643;
constexpr int wetSensor0 = 879;

constexpr int drySensor1 = 2657;
constexpr int wetSensor1 = 944;

String getQueryString(const char variableName[], String value) {
  return getQueryString(variableName, {value});
}

String getQueryString(const char variableName[], std::vector<String> values) {
  String queryString = "&" + String(variableName) + "=";
  queryString += "[";
  for (int i=0; i<values.size()-1; ++i) {
    queryString += values[i] + ",";
  }
  queryString += values[values.size()-1];
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

constexpr int arraySize = 5;
int humidityArray0[arraySize], humidityArray1[arraySize];

int average(int array[]) {
  int avg = 0;
  for (int i=0; i<arraySize; ++i) {
    avg += array[i];
  }
  return avg/arraySize;
}

void loop() {
  int analogValue0 = analogRead(humiditySensorInput0);
  int humidity0 = map(analogValue0, drySensor0, wetSensor0, 0, 100);
  for (int i=1; i<arraySize; ++i) {
    humidityArray0[i] = humidityArray0[i-1];
  }
  humidityArray0[0] = humidity0;
  Serial.printf("Humidity0 = %d\n", average(humidityArray0));

  // int analogValue1 = analogRead(humiditySensorInput1);
  // int humidity1 = map(analogValue1, drySensor1, wetSensor1, 0, 100);
  // for (int i=1; i<arraySize; ++i) {
  //   humidityArray1[i] = humidityArray1[i-1];
  // }
  // humidityArray1[0] = humidity1;
  // Serial.printf("Humidity1 = %d\n", average(humidityArray1));
  
  delay(1000);
  if ((millis() - lastTime) > timerDelay) {
    if(WiFi.status() == WL_CONNECTED) {
      sendToApi(serverName + getQueryString("humidities", 
        std::vector<String>{String(average(humidityArray0))}));
    }
    else {
      Serial.println("WiFi Disconnected");
      connectWifi();
    }
    lastTime = millis();
  }
}