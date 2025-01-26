# CRM System
Welcome to the **CRM System** project! This repository contains the source code for a comprehensive Customer Relationship Management system designed to streamline task management, team collaboration, and project tracking.

## Table of Contents
- [About the Project](#about-the-project)
- [Features](#features)
- [Folder Structure](#folder-structure)
- [Technologies Used](#technologies-used)
- [Setup Instructions](#setup-instructions)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [License](#license)

## About the Project
The **CRM System** is a powerful application tailored for businesses and teams to manage their workflow efficiently. It simplifies complex processes by offering a centralized platform to track tasks, monitor progress, and collaborate seamlessly. 

### Key Objectives:
- Enhance productivity through task prioritization and streamlined workflows.
- Foster team collaboration with real-time updates and notifications.
- Enable easy tracking of projects and progress with intuitive dashboards.

## Features
- **Task Management**: Create, assign, and manage tasks with due dates and priorities.
- **Project Tracking**: Visualize project timelines and track progress with dynamic boards and charts.
- **Team Collaboration**: Communicate with your team using comments, activity logs, and notifications.
- **Customizable Workflows**: Define and manage workflows based on your business needs.
- **Analytics and Reporting**: Generate reports to analyze performance and productivity metrics.

## Folder Structure
- **`crm-frontend`**  
  Contains the frontend source code, providing a user-friendly interface to interact with the CRM system.
- **`crm-backend`**  
  Contains the backend source code, managing APIs, authentication, and database operations.

## Technologies Used
### Frontend:
- React.js
- HTML, CSS, JavaScript
- Libraries/Frameworks: Tailwind CSS, Bootstrap

### Backend:
- Node.js with Express.js
- Database: MongoDB/PostgreSQL/MySQL
- Authentication: JWT for secure login and session management

## Setup Instructions
Follow these steps to set up and run the project on your local machine:

### Prerequisites:
1. Install **Node.js** and **npm/yarn**.
2. Set up a database (e.g., MongoDB/PostgreSQL).

### Steps:
#### 1. Clone the Repository:
git clone https://github.com/imdsatyam/CRM-Portal
cd CRM-Portal

#### 2. Setup Frontend:

- cd portfolio-frontend
- npm install
- npm start
This starts the development server for the frontend.

#### 3. Setup Backend:

- cd portfolio-backend
- npm install
- npm run dev
This starts the development server for the frontend.

## Environment Variables
Create .env files for both frontend and backend as needed.

### Example for the backend:
- PORT=5000
- DB_URI=mongodb://localhost:27017/portfolio
- JWT_SECRET=your-secret-key
- Ensure to update these values based on your local or production environment.

## Usage
1. Open the frontend in your browser at http://localhost:3000 (default port).
2. The backend runs at http://localhost:5000 (or the port specified in .env).

## License
This project is licensed under the MIT License.
