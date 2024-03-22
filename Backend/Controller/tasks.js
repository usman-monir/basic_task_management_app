const connection = require("../server");

// ? ALL TASKS ----------------------------------
exports.getAllTasks = (req, res) => {
  const { email } = req.query;
  const queryString = 'SELECT * FROM task WHERE email = ?';

  connection.query(queryString, email, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Something went wrong while fetching tasks",
        err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: `Tasks fetched for the user with email ${email} successfully`,
      tasks: result[0] ? [...result] : [],
    });
  });
};

//? DELETE TASK ----------------------------------
exports.deleteTask = (req, res) => {
  const { taskId } = req.query;
  const queryString = `DELETE from task where id = ?`;

  connection.query(queryString, taskId, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Cannot deleted task with id '" + taskId,
        success: false,
        err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Task deleted successfully",
      success: true,
      result,
    });
  });
};

//? ADD TASK ----------------------------------
exports.addTask = (req, res) => {
  const { id, email, content } = req.body;
  const queryString = `INSERT INTO task (id, email, content) VALUES (?, ?, ?)`;
  const values = [id, email, content];

  connection.query(queryString, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Cannot add new task",
        success: false,
        err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Task added successfully",
      success: true,
      result
    });
  });
};


//? TOGGLE TASK STATUS ----------------------------------
exports.toggleTaskStatus = (req, res) => {
  const { status, taskId } = req.body;
  const queryString = `update task set status = ? where id = ?`;
  const values = [status, taskId]

  connection.query(queryString, values, (err, result) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Cannot toggle status for task with id '" + taskId,
        success: false,
        err,
      });
    }
    return res.status(200).json({
      status: "success",
      message: "Task status toggled successfully",
      success: true,
      result
    });
  });
};


//? EDIT TASK ----------------------------------
exports.editTask = (req, res) => {
  const {content, taskId} = req.body;
  const queryString = "update task set content = ? where id = ?";
  const values = [content, taskId];
  connection.query(queryString, values, (err, result) => {
    if(err)
    {
      return res.status(500).json(
        {
          status: "error",
          message: "Cannot update task",
          success: false,
          err
        }
      )
    }
    return res.status(200).json(
      {
        status: "success",
        message: "Task updated successfully",
        success: true,
        result
      }
    )
  });
}
