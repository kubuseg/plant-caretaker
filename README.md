# Plant Caretaker System

## Overview

The Plant Caretaker is a smart physical system designed to automate the watering and fertilization of up to four plants. It combines hardware components, microcontroller programming, cloud-based APIs, and a user-friendly mobile app for seamless plant management.

## Features

- **Hardware Components:**
  - 2 pumps and 4 valves for irrigation and fertilization.
  - 4 capacitive humidity sensors for soil moisture detection.
  - Low-voltage MOS transistors for control.
  - ESP32 microcontroller for processing and connectivity.
  - Irrigation pipes for water delivery.
- **Microcontroller Programming:**
  - Implements automated plant care logic using C++.
  - Communicates with cloud services via REST API.
- **Mobile Application:**
  - Developed in React for plant and irrigation management.
  - Connects to the system via WiFi for real-time updates.
- **Cloud Infrastructure:**
  - REST API hosted on Microsoft Azure Function App.
  - User and plant data is stored in Azure Cosmos DB (NoSQL).

## Repository Structure

- **React Application:** Located in the `MojOgrodApp` branch, provides the user interface for managing plants.
- **API:** Available in a separate repository `plant-caretaker-api`.
- **Microcontroller Code:** Found in `microcontroller-tests/Plant Caretaker/src/main.cpp`. Implements the core logic for watering, fertilization, and API communication.

## How It Works

1. **Microcontroller Logic:**
   - The ESP32 periodically checks soil moisture levels using the capacitive sensors.
   - Based on humidity thresholds, the system activates the appropriate pump and valve to water or fertilize plants.
   - Regularly sends data (e.g., humidity levels, water usage) to the cloud via REST API.
2. **Mobile App Integration:**
   - Users can configure watering schedules and view plant health data through the React app.
   - The app fetches data from the API and provides control options.
3. **Cloud Integration:**
   - The Azure-based REST API handles data synchronization between the microcontroller and the app.
   - Stores plant parameters, user preferences, and historical data in Cosmos DB.

## Key Microcontroller Functionalities

- **Timer-Based Automation:**
  - Measures soil humidity every hour.
  - Retrieves plant configuration data from the API every hour.
  - Checks for watering requirements every six hours.
- **REST API Integration:**
  - Sends soil humidity and water level alarms to the cloud.
  - Retrieves plant-specific data for adaptive care.
- **Watering Logic:**
  - Activates the appropriate valve and pump based on plant needs.
  - Ensures water flow duration is calculated dynamically for efficient use.

