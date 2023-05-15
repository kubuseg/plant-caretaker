#include <Arduino.h>

constexpr int pin1 = 13;
constexpr int pin2 = 12;

enum State {
  Pump,
  Wait
};
State state = Wait;

void setup() {
  pinMode(pin1, OUTPUT);
  pinMode(pin2, OUTPUT);
}

void loop(){
  switch (state) {
    case Wait:
    digitalWrite(pin1, LOW);
    digitalWrite(pin2, LOW);
    delay(1000);
    state = Pump;
    break;
    case Pump:
    digitalWrite(pin1, HIGH);
    digitalWrite(pin2, HIGH);
    delay(1000);
    state = Wait;
    break;
  }
}
