
import "bootstrap/dist/css/bootstrap.min.css"
import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import LoginAuth from "./Components/Auth/Login"
import SignupAuth from "./Components/Auth/Signup"
import Tasks from "./Components/Core/Tasks"
import NewTaskForm from "./Components/Core/NewTaskForm"
import EditTaskForm from "./Components/Core/EditTaskForm"

const App = () =>
    <BrowserRouter>
      <Routes>
        <Route path="/auth/login" element={<LoginAuth />} />
        <Route path="/auth/signup" element={<SignupAuth />} />
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/tasks/addNewTask" element={<NewTaskForm />} />
        <Route path="/tasks/editTask" element={<EditTaskForm />} />
      </Routes>
    </BrowserRouter>

export default App
