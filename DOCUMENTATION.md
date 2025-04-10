# RescueGrid: AI-Powered Disaster Coordination Platform

## 📝 Project Documentation

### Overview

RescueGrid is an intelligent disaster management platform designed to revolutionize emergency response coordination. The solution enables real-time communication between rescue agencies, provides AI-driven task assignment, and offers citizens direct access to emergency services through an intuitive SOS system with an AI-powered chatbot.

![RescueGrid Architecture](https://via.placeholder.com/800x400?text=RescueGrid+Architecture)

---

## 🏗️ System Architecture

### Tech Stack

| Component | Technologies |
|-----------|-------------|
| **Frontend** | React 18, Vite, TailwindCSS |
| **Backend** | Node.js, Express, WebSockets |
| **Database** | Firebase Firestore |
| **AI Components** | Hugging Face LLMs, Flask (Python) |
| **Maps** | Leaflet.js |
| **Authentication** | Firebase Auth |
| **Real-time Communication** | WebSockets |

### Architecture Diagram

---

## 🖥️ Frontend Structure

The frontend is built using React 18 with Vite as the build tool. The UI is styled with TailwindCSS following a responsive design approach.

### Key Components

- **Map Components**: Interactive maps showing agency locations and SOS heatmaps
- **Agency Dashboard**: Real-time monitoring panel for rescue agencies
- **Admin Panel**: Command center for administrators to manage rescue operations
- **SOS Portal**: Simplified interface for citizens to request help
- **Chatbot Interface**: AI-powered emergency guidance system

### State Management

Application state is managed through React Context APIs:
- `AuthContext`: Handles user authentication state
- `MapContext`: Manages map-related data and operations

### Offline Capabilities

The frontend implements Progressive Web App (PWA) features to enable offline functionality, storing critical information in local storage and syncing when connectivity is restored.

---

## ⚙️ Backend Structure

The backend follows a modular architecture pattern with separate controllers for each domain area.

### API Endpoints

The main API endpoints include:

- `/api/auth/*`: Authentication-related endpoints
- `/api/agency/*`: Agency management endpoints
- `/api/admin/*`: Administrative operations
- `/api/sos/*`: SOS signal processing
- `/api/chat/*`: Communication between agencies
- `/api/chatbot/*`: LLM-powered emergency chatbot

### WebSockets Server

Handles real-time communication for:
- Live location updates
- Chat messages
- SOS signal broadcasts
- Status changes

### LLM-Powered Chatbot

The chatbot module utilizes Hugging Face models to provide contextual emergency guidance:

- **Context Management**: Maintains conversation history for personalized responses
- **Emergency Instructions**: Pre-defined guidance for different emergency types
- **Multilingual Support**: Detects and responds in various languages

### AI Matching System

Algorithm for optimal rescue team assignment based on:
- Geographic proximity
- Agency capabilities
- Emergency severity
- Available resources

---

## 🛠️ Installation & Setup

### Prerequisites

- Node.js 14+ 
- Python 3.8+ (for AI components)
- Firebase account
- Hugging Face API key

### Frontend Setup

```bash
# Navigate to the Frontend directory
cd Frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Update Firebase configuration in .env

# Start development server
npm run dev
