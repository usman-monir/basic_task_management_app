import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import Task from './Task';
import Navbar from '../Util/Navbar';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const {state} = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () =>
    {
      const response = await axios.get('http://127.0.0.1:3000/api/v1/tasks/allTasks', { params: {email: state?.user.email}});
      console.log(response.data.tasks);
      setTasks(response.data.tasks);
    }
    fetchTasks();
  }, []);

  const handleDelete = async (id) => {
    const response = await axios.delete('http://127.0.0.1:3000/api/v1/tasks/deleteTask', { params: {taskId: id}});
    if ( response.data.success === true ) {
      setTasks(tasks.filter(task => task.id !== id));
      toast.success("Task deleted successfully!");
    }
    else toast.error("Task cannot be deleted!");
  };

  const handleEdit = async (task) => {
    navigate('/tasks/editTask', {state: { task, user:state?.user } });
  };

  const addNewTask = () => {
    navigate('/tasks/addNewTask', {state: { user: state?.user} });
  }

  return (
    <>
    <Navbar user={state?.user}/>
    <div className="container">
    {state ? <>
    <ToastContainer/>
    <div className="m-3 p-3">
      {tasks.length === 0 && <h2>No Tasks yet..</h2>}
      <div className="d-flex flex-column my-2">
        {tasks.map((task) => (
          <div key={task.id}>
            <Task task={task} onDelete={handleDelete} onEdit={handleEdit} />
          </div>
        ))}
      </div>
      <button className='btn btn-success' onClick={()=>addNewTask()}>Add New</button></div></>
      : navigate('/auth/login')
      }
  </div>
  </>
  );
};

export default Tasks;
