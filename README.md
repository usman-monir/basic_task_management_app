Task Manager Application
Welcome to the Task Manager application developed by Mohammd Usman Monir! This application serves as a CRUD (Create, Read, Update, Delete) tool for managing tasks. It features JWT authentication for secure access and utilizes MySQL as its database. The frontend is developed using React.js, while the backend is built with Node.js.

Features
CRUD Operations: Easily create, read, update, and delete tasks.
JWT Authentication: Secure user authentication using JSON Web Tokens.
MySQL Database: Efficient storage and retrieval of task data.
Responsive Design: The frontend is designed to be responsive, providing a seamless experience across different devices.
Installation
To get started with the Task Manager application, follow these steps:

Clone this repository to your local machine:

bash
Copy code
git clone https://github.com/usman-monir/basic_task_management_app
Navigate to the project directory:

bash
Copy code
cd task-manager
Install dependencies for both frontend and backend:

bash
Copy code
cd frontend
npm install
cd ../backend
npm install
Set up the MySQL database:

Create a new MySQL database and configure the connection details in the backend .env file.
You can find a sample .env file in the backend directory (backend/.env.example). Copy this file and rename it to .env, then fill in your MySQL database credentials.
Start the backend server:

bash
Copy code
cd backend
npm start
Start the frontend development server:

bash
Copy code
cd frontend
npm run dev
Open your browser and navigate to http://localhost:3000 to access the Task Manager application.

Technologies Used
Frontend:

React.js
React Router
Bootstrap
Axios
React Toastify
Backend:

Node.js
Express.js
MySQL
JWT for authentication
bcryptjs for password hashing
Nodemailer for email functionality
