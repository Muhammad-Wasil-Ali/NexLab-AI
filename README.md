# 🚀 NexLab AI

A modern, full-stack AI SaaS application built with **Next.js 15**, **MongoDB**, and **Google Gemini AI**. NexLab AI allows users to securely authenticate, chat with AI, manage conversation history, create reusable prompt libraries, and monitor their activity through a responsive dashboard.

> **Live Demo:** https://nex-lab-ai.vercel.app/

---

## 📖 Overview

NexLab AI is an AI-powered assistant designed with a clean and scalable architecture. The application provides a modern chat experience similar to ChatGPT while allowing users to organize prompts, manage conversations, and securely access their personal workspace.

---

## ✨ Features

### 🔐 Authentication

* User Registration
* Secure Login
* Forgot Password
* JWT Authentication
* HTTP-only Cookies
* Protected Dashboard Routes
* Password Hashing using bcrypt

---

### 🤖 AI Chat (Google Gemini)

* Google Gemini AI Integration
* Multiple Chat Conversations
* Persistent Chat History
* Continue Previous Conversations
* Auto-generated Chat Titles
* Typing Indicator
* Markdown Responses
* Copy AI Responses
* Regenerate Responses
* Stop Generation
* Retry on Error
* Edit User Messages
* Delete Messages
* Responsive Chat Interface

---

### 📝 Prompt Library

* Create Custom Prompts
* Edit Prompts
* Delete Prompts
* Favorite Prompts
* Search Prompts
* Copy Prompt
* Use Prompt Directly in AI Chat
* User-specific Prompt Storage

---

### 📊 Dashboard

* User Statistics
* Total Chats
* Total Messages
* Saved Prompts
* Favorite Prompts
* Recent Conversations
* Recent Activity
* Quick Actions

---

### 👤 Profile & Settings

* View Profile
* Update Profile Information
* Change Password
* Logout
* Account Statistics

---

### 📚 Activity Tracking

Automatically tracks important user actions including:

* User Login
* New Chat
* Deleted Chat
* Created Prompt
* Updated Prompt
* Deleted Prompt
* Profile Updates

---

### 🎨 UI / UX

* Modern SaaS Design
* Fully Responsive
* Mobile Friendly
* Purple Theme
* Loading States
* Empty States
* Smooth Animations
* Reusable Components
* Clean Dashboard Layout

---

## 🛠 Tech Stack

### Frontend

* Next.js 15 (App Router)
* React
* JavaScript
* Tailwind CSS

### Backend

* Next.js API Routes
* MongoDB
* Mongoose
* JWT
* bcryptjs

### AI

* Google Gemini API

### Deployment

* Vercel

---

## 📂 Project Structure

```text
app/
components/
lib/
models/
repositories/
services/
utils/
middleware/
```

The project follows a modular architecture with:

* Repository Layer
* Service Layer
* API Layer
* Utility Layer
* Reusable Components

---

## ⚙️ Environment Variables

Create a `.env.local` file in the project root and add the following variables:

```env
MONGODB_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

GEMINI_API_KEY=your_gemini_api_key
```

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the Project

```bash
cd nexlab-ai
```

### 3. Install Dependencies

Using npm

```bash
npm install
```

or

```bash
npm i
```

### 4. Configure Environment Variables

Create a `.env.local` file and add all required environment variables.

### 5. Start the Development Server

```bash
npm run dev
```

Open your browser and visit:

```text
http://localhost:3000
```

---

## 📌 Available Scripts

```bash
npm run dev
```

Starts the development server.

```bash
npm run build
```

Builds the application for production.

```bash
npm run start
```

Runs the production build locally.

```bash
npm run lint
```

Runs ESLint checks.

---

## 🔒 Security

* JWT Authentication
* HTTP-only Cookies
* Password Hashing
* Protected Routes
* Secure API Architecture
* User-specific Data Access

---

## 🏗 Architecture

The application follows a scalable architecture:

```
Client
    │
    ▼
Reusable Components
    │
    ▼
API Utilities
    │
    ▼
API Routes
    │
    ▼
Service Layer
    │
    ▼
Repository Layer
    │
    ▼
MongoDB
```

---

## 📱 Responsive Design

The application is optimized for:

* Desktop
* Laptop
* Tablet
* Mobile Devices

---

## 📈 Future Improvements

* AI Image Generation
* File Upload & Analysis
* Voice Chat
* Team Workspaces
* Prompt Categories
* AI Model Selection
* Export Chat History
* Dark/Light Theme Toggle

---

## 👨‍💻 Author

**Muhammad Wasil**

---

## 📄 License

This project was developed as part of a technical assessment and is intended for educational and portfolio purposes.
