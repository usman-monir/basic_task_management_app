const mysql = require("mysql");
const app = require("./app");

// Create a connection to the MySQL server
const connection = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user:  process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Connect to the MySQL server
connection.connect((err)=>{
if(err) throw err;
console.log('Connected to MySql');

// Query to create a database
connection.query('CREATE DATABASE IF NOT EXISTS ' + process.env.DB_NAME, (err, result)=>{
    if(err) throw err;
    // use that database
    console.log('Database created');
});

// use this database to query
connection.query("USE " + process.env.DB_NAME, (err, result)=>{
    if(err) throw err;
    console.log('Using database ' + process.env.DB_NAME);
});
});

const requireFilesAndExports = () => {
  module.exports = connection;

  const auth = require("./Router/authRouter");
  const tasks = require("./Router/tasksRouter");

  app.use("/api/v1", auth);
  app.use("/api/v1/tasks", tasks);

  app.use((req, res) => {
    res.status(404).render("error", {
      msg: "404 Page not found",
      invalidRoute: true,
    });
  });
};

// TODO: LISTENING FOR REQUEST ON SERVER-----------------------
app.listen(process.env.PORT, function () {
  console.log("listening on port 3000");
  requireFilesAndExports();
});
