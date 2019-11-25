const express = require("express");
const serverlessHttp = require("serverless-http");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/tasks", function(request, response) {
  // Get all the tasks from the database
  response.status(200).send("You requested all the tasks!");
});

app.delete("/tasks/:tasksId", function (request, response){
  
    //Delete the task with the given ID from the datadase
  const taskId = request.params.taskId;
  response.status(200).send (`sucessly deleted task!`)
});

app.post("/tasks", function ( request, response){
  const task = request.body;
  //{"hoover the car", complete: true, date: "2019-10-11"}
  response.status(201).send (`successfully created ${task.text}`)
});

app.put("/tasks", function(request, response) {
  // update the tasks from the database
  const updateId = request.params.updateId;
  response.status(200).send(`You updated all the tasks!`);
});

module.exports.tasks = serverlessHttp(app);