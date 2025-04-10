# RescueGrid: AI-Powered Disaster Coordination & Communication Platform

## Overview
RescueGrid is a real-time, intelligent web platform designed for disaster management. It facilitates coordination among rescue agencies, allowing them to register, communicate, and respond effectively during emergencies. The platform also empowers citizens to send SOS signals and receive assistance.

## Features
- **Dynamic Heatmap of SOS Signals**: Visualizes clustered distress calls in real-time.
- **AI-Based Rescue Matching**: Assigns rescue tasks based on severity, proximity, and agency capability.
- **Voice-Command Console**: Enables hands-free operation for rescue agents.
- **Offline Mode + P2P Messaging**: Ensures communication during internet outages.
- **Multilingual Chatbot for Citizens**: Assists citizens in local languages.
- **Secure Admin Panel**: Manages disaster zones, alerts, and agency priorities.

## Tech Stack
- **Frontend**: React, Vite, TailwindCSS
- **Backend**: Node.js, Express, Firebase, Python Flask
- **Database**: Firebase Firestore
- **Real-Time Communication**: WebSockets
- **AI Model**: Scikit-learn for rescue task assignments

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the frontend directory:
   ```
   cd Frontend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Start the development server:
   ```
   npm run dev
   ```

## Usage
- **For Agencies**: Register and log in to view the dashboard, receive alerts, and communicate with other agencies.
- **For Citizens**: Access the SOS portal to send distress signals without needing to log in.
- **For Admins**: Monitor activities, manage agencies, and send push notifications.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.