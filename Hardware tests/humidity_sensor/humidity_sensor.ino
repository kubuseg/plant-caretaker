const int dry = 501; // value for dry sensor
const int wet = 200; // value for wet sensor

void setup() {
  //Set up Serial communication
  Serial.begin(115200);
  
  //Set pins for soil sensor
  pinMode(A1, INPUT);
  pinMode(A2, OUTPUT);
  pinMode(A3, OUTPUT);
  digitalWrite(A2, HIGH);
  digitalWrite(A3, LOW);
}

void loop() {
  //Get humidity
  int sensorVal = analogRead(A1);
  int humidity = map(sensorVal, wet, dry, 100, 0);
  Serial.print("Humidity: ");
  Serial.print(humidity);
  Serial.println("%");
  delay(1000);
}
