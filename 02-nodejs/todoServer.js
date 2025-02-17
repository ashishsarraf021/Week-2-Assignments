/**
  You need to create an express HTTP server in Node.js which will handle the logic of a todo list app.
  - Don't use any database, just store all the data in an array to store the todo list data (in-memory)
  - Hard todo: Try to save responses in files, so that even if u exit the app and run it again, the data remains (similar to databases)

  Each todo has a title and a description. The title is a string and the description is a string.
  Each todo should also get an unique autogenerated id every time it is created
  The expected API endpoints are defined below,
  1.GET /todos - Retrieve all todo items
    Description: Returns a list of all todo items.
    Response: 200 OK with an array of todo items in JSON format.
    Example: GET http://localhost:3000/todos
    
  2.GET /todos/:id - Retrieve a specific todo item by ID
    Description: Returns a specific todo item identified by its ID.
    Response: 200 OK with the todo item in JSON format if found, or 404 Not Found if not found.
    Example: GET http://localhost:3000/todos/123
    
  3. POST /todos - Create a new todo item
    Description: Creates a new todo item.
    Request Body: JSON object representing the todo item.
    Response: 201 Created with the ID of the created todo item in JSON format. eg: {id: 1}
    Example: POST http://localhost:3000/todos
    Request Body: { "title": "Buy groceries", "completed": false, description: "I should buy groceries" }
    
  4. PUT /todos/:id - Update an existing todo item by ID
    Description: Updates an existing todo item identified by its ID.
    Request Body: JSON object representing the updated todo item.
    Response: 200 OK if the todo item was found and updated, or 404 Not Found if not found.
    Example: PUT http://localhost:3000/todos/123
    Request Body: { "title": "Buy groceries", "completed": true }
    
  5. DELETE /todos/:id - Delete a todo item by ID
    Description: Deletes a todo item identified by its ID.
    Response: 200 OK if the todo item was found and deleted, or 404 Not Found if not found.
    Example: DELETE http://localhost:3000/todos/123

    - For any other route not defined in the server return 404

  Testing the server - run `npm run test-todoServer` command in terminal
 */

const PORT = 3000;
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();

app.use(bodyParser.json());


let todos = [];

function findIndex(arr, id) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].id === id) return i;
  }
  return -1;
}

function fetch(req, res) {
  res.json(todos);
}

app.get('/todos', fetch);   //first question;


function getById(req, res) {
  // const id = req.params.id;
  // const k = parseInt(req.params.id);

  // // const todo = todos.find(todos.id === k);
  // const todo = todos.find(t => t.id === k);

  // if (!todo) {
  //   res.status(404).send("required todo do not exist");
  // }
  // else {
  //   res.json(todo);
  // }

  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }


}
app.get('/todos/:id', getById);


function createTodo(req, res) {
  const newtodo = {
    id: Math.floor(Math.random() * 1000000),
    title: req.body.title,
    description: req.body.description
  };

  todos.push(newtodo);
  res.status(201).json(newtodo);
}

app.post('/todos', createTodo);


// function updateTodoById(req, res) {
//   const k = parseInt(req.params.id, 10);

//   const ind = todos.findIndex(todos.id === k);

//   if (ind === -1) {
//     res.status(404).send("required todo do not exist");
//   }
//   else {
//     todos[ind].title = req.body.title;
//     todos[ind].description = req.body.description;

//     res.status(202).json(todos[ind]);
//   }

// }


function updateTodoById(req, res) {
  // const k = parseInt(req.params.id);

  // const ind = todos.findIndex(todo => todo.id === parseInt(req.params.id)); // Corrected findIndex method usage

  // if (ind === -1) {
  //   res.status(404).send("Required todo does not exist");
  // } else {
  //   todos[ind].title = req.body.title;
  //   todos[ind].description = req.body.description;

  //   res.status(202).json(todos[ind]);
  // }

  const todoIndex = findIndex(todos, parseInt(req.params.id));
  if (todoIndex === -1) {
    res.status(404).send();
  } else {
    todos[todoIndex].title = req.body.title;
    todos[todoIndex].description = req.body.description;
    res.json(todos[todoIndex]);
  }
}
app.put('/todos/:id', updateTodoById);


function deleteById(req, res) {
  const k = parseInt(req.params.id, 10);

  const ind = todos.findIndex(ind => todos.id === k);

  if (ind === -1) {
    res.status(404).send("required todo do not exist");
  }
  else {
    todos.splice(ind, 1);
    res.status(200).send();
  }
}
app.delete('/todos/:id', deleteById);


// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

function started() {
  console.log(`Example app listening on port ${PORT}`)
}

app.listen(PORT, started)

module.exports = app;
