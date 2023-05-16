#include <Arduino.h>

constexpr int pumpPin = 14;
constexpr int valvePin1 = 13;
constexpr int valvePin2 = 12;


enum State {
  OpenValve1,
  OpenValve2,
  CloseValve1,
  CloseValve2
};
State state = OpenValve1;

void setup() {
  pinMode(pumpPin, OUTPUT);
  pinMode(valvePin1, OUTPUT);
  pinMode(valvePin2, OUTPUT);
  digitalWrite(pumpPin, HIGH);
}

void loop(){
  switch (state) {
    case OpenValve1:
    digitalWrite(valvePin1, HIGH);
    digitalWrite(valvePin2, LOW);
    state = OpenValve2;
    break;
    case OpenValve2:
    digitalWrite(valvePin1, HIGH);
    digitalWrite(valvePin2, HIGH);
    state = CloseValve1;
    break;
    case CloseValve1:
    digitalWrite(valvePin1, LOW);
    digitalWrite(valvePin2, HIGH);
    state = CloseValve2;
    break;
    case CloseValve2:
    digitalWrite(valvePin1, LOW);
    digitalWrite(valvePin2, LOW);
    state = OpenValve1;
    break;
  }
  delay(5000);
}
