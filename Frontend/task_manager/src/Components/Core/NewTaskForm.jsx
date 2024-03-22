import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';
import Navbar from '../Util/Navbar';

const AddTaskForm = () => {
  const [taskContent, setTaskContent] = useState('');
  const [shouldGoBackToAllTasks, setShouldGoBackToAllTasks] = useState(false);

  const navigate = useNavigate();
  const {state} = useLocation();
  const uuid = uuidv4();

  const handleChange = (e) => {
    setTaskContent(e.target.value);
  };

  useEffect(() => {
    if( shouldGoBackToAllTasks) navigate('/tasks' , {state: {user: state?.user}})
  },[shouldGoBackToAllTasks])

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!taskContent.trim()) {
      toast.warning('Task content cannot be empty!');
      return;
    }

    try {
      const response = await axios.post('http://127.0.0.1:3000/api/v1/tasks/addTask', {
        content: taskContent, email: state?.user?.email, id: uuid
      });
      if (response.data.success) {
        setTaskContent(''); // Clear the form input
        setShouldGoBackToAllTasks(true);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding task:', error);
      toast.error('An error occurred while adding the task.');
    }
  };
   return (
    <>
    <Navbar user={state?.user}/>
    <div className='container my-3'>
      <h2>Add New Task</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label htmlFor="taskContent">Task Content:</label>
          <input
            type="text"
            id="taskContent"
            className="form-control"
            value={taskContent}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary my-2">Add Task</button>
      </form>
      <ToastContainer />
    </div>
    </>
  );
};

export default AddTaskForm;
