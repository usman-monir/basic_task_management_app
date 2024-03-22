import React, { useState } from 'react';
import axios from 'axios';

const Task = ({ task, onDelete, onEdit }) => {
  const [ isCompleted, setIsCompleted ] = useState(task.status);
  const toggleCompleted = async () => {
    const response = await axios.patch("http://127.0.0.1:3000/api/v1/tasks/toggleStatus", { status: !isCompleted, taskId: task.id });

    if (response.data.success)
      setIsCompleted((prev) => !prev);
  }
  return (
    <div className="card mb-3 col-6">
      <div className="card-body d-flex justify-content-between">
        <p className="card-text" style={ isCompleted ? {opacity : .5, color: "grey"} : {opacity: 1}}>{task.content}</p>
        <div className="mx-3">
          <button
            className="btn btn-danger mx-1"
            onClick={() => onDelete(task.id)}
          >
            x
          </button>
          <button
            className="btn btn-primary mx-1"
            onClick={() => onEdit(task)}
          >
            Edit
          </button>
          <input className='form-check-input mx-1' type='checkbox' checked={isCompleted}
          onChange={() => toggleCompleted()}/>
        </div>
      </div>
    </div>
  );
};

export default Task;
