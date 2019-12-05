const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require ("mysql")

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: `todo_list`
});


const app = express();
app.use(cors());
app.use(bodyParser.json());
"text": "hoover the car"
app.get("/tasks", function(request, response) {
  // Get all the tasks from the database
  connection.query("SELECT * FROM task", function(err, data){
    if (err){
      response.status(500).json({error: err});

    } else {
    response.status(200).json(data);
  }
  })
  
});

app.delete("/tasks/:tasksId", function (request, response){
  
    //Delete the task with the given ID from the datadase
    const taskId = request.params.taskId;

    //escape user-providerd value
    connection.query("DELETE from Task Where taskId =?" + [taskId], function (err){
        if (err) {
          response.status(500).json({error:err});
        } else {
          response.sendstatus(200)
        }
    })
});

app.post("/tasks", function ( request, response){
  const task = request.body;
  const q = "INSERT INTO task SET ?" ;
  //{"hoover the car", complete: true, date: "2019-10-11"}
  connection.query( q, task, function (err, data) {
    if (err) {
      response.status(200).json({error:err});
    } else {
      task.taskId = data.insertId;
      response.status(201).json(task);
    }
  })
  // response.status(201).send (`successfully created ${task.text}`)
});

app.put("/tasks/:taskId", function(request, response) {
  // update the tasks from the database
  const taskId = request.params.taskId;
  const task = request.body;
  const q = "UPDATE Task SET text = ?, completed = ? dateDue =? WHERE taskId = ?"
  connection.query(q, [task.text, task.completed, task.dateDue, taskId ], function (err,data){
if (err) {
  response.status(500).json({error:err});
} else {
  response.status(205).json({task: data})
}
  })

  
  // {text: "i changed", completed: true, dateDue:"2019-10-21" .....}
  // response.status(200).send(`You updated all the tasks!${taskId} with task text "${JSON.stringify(task)}`);
});

module.exports.tasks = serverlessHttp(app);