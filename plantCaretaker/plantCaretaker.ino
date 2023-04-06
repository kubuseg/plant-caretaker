#include <RTClib.h>

RTC_DS3231 rtc;

const int dry = 501; // value for dry sensor
const int wet = 200; // value for wet sensor

const bool isTest = false;
const int loopTimeMs = 500;
const float milliliters = 100.0f;
const int minHumidity = isTest ? 100 : 40;

//Function for water quantity Q(t)=35t-60 
const int pumpTimeSec = floor((milliliters + 60.0f)/35.0f);
const TimeSpan pumpTimespan = TimeSpan(pumpTimeSec);
const TimeSpan waitTimespan = TimeSpan(0, 1, 0, 0);

enum AlarmMode {
  Pump,
  Wait,
  Idle
};
AlarmMode currentAlarmMode = Idle;

void beginRTC() {
  if (!rtc.begin()) {
    Serial.println("Couldn't find RTC!");
    Serial.flush();
    while (1) delay(10);
  }
}

void setAlarmMode(DateTime dateTime, AlarmMode mode) {
  currentAlarmMode = mode;
  switch (mode) {
    case Pump:
      Serial.println("Alarm mode set to: Pump");
      Serial.print("Pumping ");
      Serial.print(pumpTimeSec*35-60);
      Serial.println("ml");
      break;
    case Wait:
      Serial.println("Alarm mode set to: Wait");
      break;
    case Idle:
      Serial.println("Alarm mode set to: Idle");
      break;
  }
}

void setAlarmTime(DateTime dateTime) {
  //Alarm turns on when hour and minute and seconds math with given dateTime
  while (!rtc.setAlarm1(dateTime, DS3231_A1_Hour)) {
    Serial.println("Error, alarm wasn't set!");
    Serial.flush();
    beginRTC();
    digitalWrite(6, LOW);
    delay(10);
  }
  DateTime alarm1 = rtc.getAlarm1();
  char alarm1Date[] = "hh:mm:ss";
  alarm1.toString(alarm1Date);
  Serial.print("Alarm will happen at: ");
  Serial.println(alarm1Date);
}

void setAlarm(DateTime dateTime, AlarmMode mode) {
  setAlarmMode(dateTime, mode);
  setAlarmTime(dateTime);
}

void setup() {
  //Set up Serial communication
  Serial.begin(9600);

  //Set pins for soil sensor
  pinMode(A2, OUTPUT);
  digitalWrite(A2, HIGH);
  pinMode(A3, OUTPUT);
  digitalWrite(A3, LOW);

  //Setup for MOS pwm pin
  pinMode(6, OUTPUT);

  //Setup for RTC
  beginRTC();
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
  setAlarm(rtc.now() + TimeSpan(10), isTest ? Wait : Idle);
}

void loop() {
  int startTime = millis();

  //Print current time
  char date[] = "hh:mm:ss";
  rtc.now().toString(date);
  Serial.print(date);

  //Print alarm
  DateTime alarm1 = rtc.getAlarm1();
  char alarm1Date[] = "hh:mm:ss";
  alarm1.toString(alarm1Date);
  Serial.print(" [Alarm: ");
  Serial.print(alarm1Date);
  Serial.println("]");

  //Get humidity
  int sensorVal = analogRead(A1);
  int humidity = map(sensorVal, wet, dry, 100, 0);
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");

  if (rtc.alarmFired(1)) {
    rtc.clearAlarm(1);
    DateTime nowTime = rtc.now();
    DateTime nowHour = DateTime(nowTime.year(),  nowTime.month(),  nowTime.day(), nowTime.hour());
    DateTime alarmTime = nowHour + waitTimespan;

    if (currentAlarmMode == Wait && 
        humidity <= minHumidity) {
      //Turn on Pump
      analogWrite(6, 40);
      setAlarm(rtc.now() + pumpTimespan, Pump);
    } else {
      //Turn off Pump
      digitalWrite(6, LOW);
      setAlarm(alarmTime, Wait);
    }
  }
  
  int endTime = millis();
  int delayTime = loopTimeMs - (endTime - startTime);
  if (delayTime < 0) {
    Serial.print("Failed to loop every ");
    Serial.print(delayTime);
    Serial.println("ms");
    Serial.print("Loop lasted ");
    Serial.print(endTime - startTime);
    Serial.println("ms");
    return;
  }
  delay(delayTime);
}
