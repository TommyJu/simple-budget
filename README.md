# 💰 Simple Budget

Simple Budget is a full-stack budgeting application built as both a **SQL learning project** and a lightweight personal finance tool.

It started as a way for me to better understand relational databases and backend architecture, but quickly grew into something more practical — a simple MVP budgeting app designed for friends, family, and anyone who wants a clean way to track their finances.

The idea came directly from my own experience using messy spreadsheets to manage money. I wanted to turn that system into something more accessible, structured, and easy to use.


## Live Demo

https://simplebudget-sync.onrender.com


## Features

- User authentication with JWT
- Secure session handling (cookies / token-based auth)
- Monthly budget tracking and breakdowns
- Fixed expense management
- Simple and intuitive UI for fast data entry
- Responsive design for mobile and desktop
- Clean separation of frontend and backend concerns
- RESTful API built with Express
- PostgreSQL for relational data modeling and queries


## Tech Stack

### Frontend
- React
- TailwindCSS
- daisyUI
- Axios
- Zustand
- React Router

### Backend
- Node.js
- Express
- PostgreSQL
- JWT (JSON Web Tokens)
- bcrypt
- CORS middleware


## Architecture Overview

Simple Budget follows a classic client-server architecture:

- REST APIs handle authentication and all budget-related operations
- JWT-based authentication is used to identify users securely
- Frontend state is managed using Zustand for UI/UX state (not security)
- PostgreSQL is used as the primary data store for structured financial data
- Backend services are separated from controllers to improve modularity and maintainability

The project was designed to simulate a real-world full-stack application while keeping scope intentionally minimal and focused.


## Learning Outcomes

This project was originally built as a **learning exercise for SQL and relational database design**, but evolved into a complete full-stack application.

On the backend, I learned how to design and structure a PostgreSQL database for real-world use cases like users, monthly budgets, and recurring expenses. I developed a deeper understanding of SQL queries, joins, and how relational data models differ from document-based systems.

I also improved my understanding of backend architecture, particularly separating concerns between controllers and services to keep the codebase modular and easier to maintain. Implementing JWT authentication helped reinforce how stateless authentication works in practice, including token generation, verification, and secure route protection.

On the frontend, I gained experience building a reactive UI that reflects backend state changes cleanly and efficiently. Using Zustand helped me separate UI state from server state and better understand when global state is appropriate in React applications.

I also worked through real-world challenges around authentication persistence, especially around cookie behavior across different browsers (notably Safari) and eventually explored token-based header authentication as an alternative approach.

Beyond the technical side, this project helped reinforce the value of building tools that solve personal problems. What started as a spreadsheet replacement turned into a structured application that reflects how I actually think about budgeting and financial tracking.

## Project Showcase
![Screenshot](/readme-assets/sample1.png)
![Screenshot](/readme-assets/sample2.png)
![Screenshot](/readme-assets/sample3.png)
![Screenshot](/readme-assets/sample4.png)
![Screenshot](/readme-assets/sample5.png)
![Screenshot](/readme-assets/sample6.png)
![Screenshot](/readme-assets/sample7.png)
![Screenshot](/readme-assets/sample8.png)

## Installation & Running the Project

### Prerequisites

- Node.js (v18+ recommended)
- PostgreSQL database


## Setup

### Clone the repository

```bash
git clone <your-repo-url>
cd simple-budget
```
### Install dependencies

#### Frontend
```bash
cd frontend
npm install
```
#### Backend
```bash
cd backend
npm install
```
## Environment Variables

Create a .env file in /backend:

```
DATABASE_URL=
PORT=
JWT_SECRET=
NODE_ENV=
FRONTEND_URL_DEV=
FRONTEND_URL_PROD=  
```
## Required Variables
- DATABASE_URL – PostgreSQL connection string
- PORT – Backend server port (e.g. 5000)
- JWT_SECRET – Secret key for signing JWT tokens
- NODE_ENV – development or production
- FRONTEND_URL_DEV – Local frontend URL (e.g. http://localhost:5173)
- FRONTEND_URL_PROD – Deployed frontend URL

## Running the Project in Development

#### Frontend
```bash
npm run dev
```
#### Backend
```bash
npm run dev
```
#### Then open
```
http://localhost:5173
```