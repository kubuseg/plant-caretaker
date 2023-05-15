#include <Arduino.h>
#include <ArduinoJson.h>
#include <WiFi.h>
#include <HTTPClient.h>
#include <vector>

constexpr char ssid[] = "NETWORK_NAME";
constexpr char password[] = "PASSWORD";

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

struct MonthInterval {
  int startMonth, endMonth;
  MonthInterval(int startMonth, int endMonth) {
    this->startMonth = startMonth;
    this->endMonth = endMonth;
  }
  MonthInterval() {
    this->startMonth = -1;
    this->endMonth = -1;
  }
};

constexpr int linesNo = 4;
bool wateringLineConnected[linesNo];
short wateringIntervalInDays[linesNo], fertilizationIntervalInWeeks[linesNo], criticalHumidity[linesNo];
int wateringMl[linesNo];
MonthInterval fertilizationMonthBetweenCondition[linesNo];

void parseJsonObject(String httpString) {
    StaticJsonDocument<768> doc;
    DeserializationError error = deserializeJson(doc, httpString);
    if (error) {
      Serial.print("deserializeJson() failed: ");
      Serial.println(error.c_str());
      return;
    }
    for (int i=0; i<linesNo; ++i) {
      wateringLineConnected[i] = false;
    }
    for (JsonPair item : doc.as<JsonObject>()) {
      const char* item_key = item.key().c_str();
      int key = atoi(item_key);

      wateringLineConnected[key] = true;
      wateringIntervalInDays[key] = item.value()["wateringIntervalInDays"];
      fertilizationIntervalInWeeks[key] = item.value()["fertilizationIntervalInWeeks"];
      fertilizationMonthBetweenCondition[key] = MonthInterval(item.value()["fertilizationMonthBetweenCondition"][0], 
                                                              item.value()["fertilizationMonthBetweenCondition"][1]);
      criticalHumidity[key] = item.value()["criticalHumidity"];
      wateringMl[key] = item.value()["wateringMl"];
    }
}

void sendApiRequest(String serverPath) {
  HTTPClient http;

  http.begin(serverPath.c_str());
  
  int httpResponseCode = http.GET();
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    parseJsonObject(http.getString());
  }
  else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  http.end();
}

void setup() {
  Serial.begin(115200);
  connectWifi();
}

void loop() {
  Serial.println();
  sendApiRequest("https://plants-function-app.azurewebsites.net/api/mc/1?code=_Hd71BUZGZ5LusfC0qZGs-XzETgXHGslEzExPuF_EdSKAzFuBHlwRg==");
  for (int i=0; i<linesNo; ++i) {
    if (!wateringLineConnected[i])
      continue;
    Serial.print("Watering line ");
    Serial.print(i);
    Serial.print(": ");
    Serial.print(wateringMl[i]);
    Serial.println("ml");
  }
  delay(10000);
}
