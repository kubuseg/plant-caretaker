# Plant caretaker 
Physical system for watering and fertilizing up to 4 plants. It consists of 2 pumps, 4 valves, an esp32 microcontroller, 6 low voltage MOS transistors, 4 capacitive humidity sensors and irrigation pipes. The microcontroller is connected to WiFi via the REST API. Plant watering and fertilization parameters are controlled by a mobile application written in React. The REST API was created using the Microsoft Azure function app. Plant and user data is stored in the NoSQL Azure Cosmos DB database.\
Location of the major functionalities:
* React app is located in MojOgrodApp branch
* Api is located in a different repo called plant-caretaker-api
* Microcontroller code is located in microcontroller-tests/Plant Caretaker/src/main.cpp
