const express = require("express");
const tasks = require("../Controller/tasks");


const router = express.Router();

router.get("/allTasks", tasks.getAllTasks);
router.delete("/deleteTask", tasks.deleteTask);
router.post("/addTask", tasks.addTask);
router.patch("/toggleStatus", tasks.toggleTaskStatus);
router.patch("/editTask", tasks.editTask);

module.exports = router;
