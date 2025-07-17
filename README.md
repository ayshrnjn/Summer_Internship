# WebHostManager

A full-stack web application for managing web hosting clients, built with React (frontend) and Node.js/Express (backend).

## Features

- User authentication (register, login)
- Add, edit, and view client details
- Dashboard for managing clients
- Secure API with JWT authentication

## Project Structure

## Getting Started

### Prerequisites

- Node.js and npm installed

### Setup

#### 1. Clone the repository

```bash
git clone https://github.com/your-username/WebHostManager.git
cd WebHostManager
```

#### 2. Install dependencies

For the frontend:
```bash
cd client
npm install
```

For the backend:
```bash
cd ../server
npm install
```

#### 3. Run the application

Start the backend server:
```bash
cd server
npm start
```

Start the frontend React app:
```bash
cd ../client
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000) and the backend on [http://localhost:5000](http://localhost:5000) by default.

## Environment Variables

Create a `.env` file in the `server/` directory for backend configuration (e.g., JWT secret, database URI).

## License

This project is licensed under the MIT License.

---

Feel free to contribute or open issues!