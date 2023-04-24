const int ledPin = 23;
const int ledPin2 = 22;
const int ledPin3 = 21;

// PWM channel 0 parameter
const int freq = 5000; // 5000 Hz
const int ledChannel = 0;
const int resolution = 8; // 8-bit resolution

void setup(){
    // Configure the channel 0
    ledcSetup(ledChannel, freq, resolution);

    // Attach the channel 0 on the 3 pins
    ledcAttachPin(ledPin, ledChannel);
    ledcAttachPin(ledPin2, ledChannel);
    ledcAttachPin(ledPin3, ledChannel);
}

void loop(){
    // Increase the brightness of the led in the loop
    for(int dutyCycle = 0; dutyCycle <= 255; dutyCycle++){
        ledcWrite(ledChannel, dutyCycle);
        delay(15);
    }
}
