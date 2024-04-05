import React from 'react';
import { createRoot } from 'react-dom/client';
import {
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
    Route,
  } from "react-router-dom";
import App from "./App";
import LoginForm from './Components/Auth/Login';
import SignupForm from './Components/Auth/Signup';
import Tasks from "./Components/Core/Tasks"
import NewTaskForm from "./Components/Core/NewTaskForm"
import EditTaskForm from "./Components/Core/EditTaskForm"

// Render your React component instead
const root = createRoot(document.getElementById('root'));
const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route index={true} path="/" element={<SignupForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/addNewTask" element={<NewTaskForm />} />
        <Route path="/tasks/editTask" element={<EditTaskForm />} />
      </Route>
    )
  );

root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
  </React.StrictMode>
);
