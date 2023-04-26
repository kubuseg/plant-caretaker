#include <Arduino.h>
#include <vector>
#include <numeric>

//Sensor 1
//Dry calibration value: 495
//Wet calibration value: 248
//Sensor 2
//Dry calibration value: 461
//Wet calibration value: 216
//Sensor 3
//Dry calibration value: 463
//Wet calibration value: 209

constexpr int humiditySensorVcc = 15;
constexpr int humiditySensorInput = 2;

enum Calibration {
  Dry,
  Wet,
  Done
};

Calibration calibration;

void setup() {
  // initialize serial communication at 115200 bits per second:
  Serial.begin(115200);
  //set the resolution to 12 bits (0-4096)
  analogReadResolution(12);

  pinMode(humiditySensorVcc, OUTPUT);
  digitalWrite(humiditySensorVcc, HIGH);
  pinMode(humiditySensorInput, INPUT);

  calibration = Dry;
  Serial.println("Hold the sensor in the air for 10 seconds for first calibration");
  delay(2000);
}

int timeLeft = 10;
std::vector<int> dryValues, wetValues;
int dryAverage, wetAverage;

void loop() {
  unsigned long startTime = millis();
  int analogValue = analogRead(humiditySensorInput);
  switch (calibration) {
    case Dry:
      if (timeLeft == 0) {
        Serial.println("Hold the sensor in the water for 10 seconds for second calibration");
        delay(8000);
        timeLeft = 10;
        calibration = Wet;
        return;
      }
      Serial.print("Time left: ");
      Serial.print(timeLeft);
      Serial.println(" seconds");
      dryValues.push_back(analogValue);
      dryAverage = std::accumulate(dryValues.begin(), dryValues.end(), 0) / dryValues.size();
      Serial.println(dryAverage);
    break;
    case Wet:
      if (timeLeft == 0) {
        Serial.println("Calibration done!");
        Serial.print("Dry calibration value: ");
        Serial.println(dryAverage);
        Serial.print("Wet calibration value: ");
        Serial.println(wetAverage);
        calibration = Done;
        return;
      }
      Serial.print("Time left: ");
      Serial.print(timeLeft);
      Serial.println(" seconds");
      wetValues.push_back(analogValue);
      wetAverage = std::accumulate(wetValues.begin(), wetValues.end(), 0) / wetValues.size();
      Serial.println(wetAverage);
    break;
    case Done:
    break;
  }

  timeLeft--;
  delay(1000 - (millis() - startTime));  // delay in between reads for clear read from serial
}