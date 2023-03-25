#include <RTClib.h>
#include <OneWire.h>
#include <DallasTemperature.h>

#define CLOCK_INTERRUPT_PIN 2

RTC_DS3231 rtc;

OneWire oneWire(5);
DallasTemperature tempSensor(&oneWire);
const int dry = 501; // value for dry sensor
const int wet = 200; // value for wet sensor

const bool isTest = false;
const float milliliters = 100.0f;
const int minHumidity = isTest ? 100 : 40;

const int startHour = isTest ? 0 : 18;
const int endHour = isTest ? 24 : 22;

//Function for water quantity Q(t)=35t-60 
const int pumpT = floor((milliliters + 60.0f)/35.0f);
const TimeSpan pumpTime = TimeSpan(pumpT);
const TimeSpan checkTime = TimeSpan(0, 1, 0, 0);

enum AlarmMode {
  Pump,
  Wait
};
AlarmMode currentAlarmMode = Wait;

double getTemp() {
  tempSensor.requestTemperatures();
  double temp = tempSensor.getTempCByIndex(0);
  return temp;
}

void setAlarm(DateTime dateTime, AlarmMode mode) {
  switch (mode) {
    case Pump:
      currentAlarmMode = Pump;
      Serial.println("Changed mode to Pump");
      Serial.print("Pumping ");
      Serial.print(pumpT*35-60);
      Serial.println("ml");
      break;
    case Wait:
      currentAlarmMode = Wait;
      Serial.println("Changed mode to Wait");
      break;
  }

  //Alarm turns on when hour and minute and seconds math with given dateTime
  if (!rtc.setAlarm1(
        dateTime,
        DS3231_A1_Hour
      )) {
    Serial.println("Error, alarm wasn't set!");
  } else {
    DateTime alarm1 = rtc.getAlarm1();
    char alarm1Date[10] = "hh:mm:ss";
    alarm1.toString(alarm1Date);
    Serial.print("Alarm will happen at: ");
    Serial.println(alarm1Date);
  }
}

void setup() {
  //Set up Serial communication
  Serial.begin(9600);
  //Set pins for soil sensor
  pinMode(A2, OUTPUT);
  digitalWrite(A2, HIGH);
  pinMode(A3, OUTPUT);
  digitalWrite(A3, LOW);

  //Setup for RTC
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC!");
    Serial.flush();
    while (1) delay(10);
  }

  if (rtc.lostPower()) {
    // this will adjust to the date and time at compilation
    rtc.adjust(DateTime(F(__DATE__), F(__TIME__)));
  }

  rtc.disable32K();

  rtc.clearAlarm(1);
  rtc.clearAlarm(2);

  rtc.writeSqwPinMode(DS3231_OFF);

  rtc.disableAlarm(2);

  //Set wait alarm
  setAlarm(rtc.now() + TimeSpan(10), isTest ? Wait : Pump);

  //Setup for temperature sensor
  tempSensor.begin();

  //Setup for MOS
  //Pwm pin
  pinMode(6, OUTPUT);
  pinMode(7, OUTPUT);
  digitalWrite(7, HIGH);
}

void loop() {
  int startTime = millis();

  //Print current time
  char date[10] = "hh:mm:ss";
  rtc.now().toString(date);
  Serial.print(date);

  //Print alarm
  DateTime alarm1 = rtc.getAlarm1();
  char alarm1Date[10] = "hh:mm:ss";
  alarm1.toString(alarm1Date);
  Serial.print(" [Alarm: ");
  Serial.print(alarm1Date);
  Serial.println("]");
  Serial.println();

  //Get temp
  double temp = getTemp();
  Serial.print("Temparature: ");
  Serial.print(temp);
  Serial.println("°C");

  //Get humidity
  int sensorVal = analogRead(A1);
  int humidity = map(sensorVal, wet, dry, 100, 0);
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");

  if (rtc.alarmFired(1)) {
    rtc.clearAlarm(1);
    DateTime nowTime = rtc.now();
    DateTime endTime = DateTime( nowTime.year(),  nowTime.month(),  nowTime.day(), endHour);
    DateTime startTime = DateTime( nowTime.year(),  nowTime.month(),  nowTime.day(), startHour);

    DateTime alarmTime = nowTime + checkTime;
    bool isWateringTime = false;
    if (alarmTime > endTime) {
      Serial.println("It's too late for watering");
      DateTime tommorrow = nowTime + TimeSpan(1, 0, 0, 0);
      alarmTime = DateTime(tommorrow.year(), tommorrow.month(), tommorrow.day(), startHour);
    } else if (nowTime < startTime) {
      Serial.println("It's too early for watering");
      alarmTime = startTime;
    } else {
      isWateringTime = true;
    }
    
    if (isWateringTime && 
        currentAlarmMode == Wait && 
        humidity <= minHumidity) {
      //Turn on Pump
      analogWrite(6, 40);
      setAlarm(rtc.now() + pumpTime, Pump);
    } else {
      //Turn off Pump
      digitalWrite(6, LOW);
      setAlarm(alarmTime, Wait);
    }
  }
  
  int endTime = millis();
  int delayTime = 1000 - (endTime - startTime);
  //Loop with 1Hz frequency
  delay(delayTime > 0 ? delayTime : 0);
}
