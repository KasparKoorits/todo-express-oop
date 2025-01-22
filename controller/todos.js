import { Todo } from "../models/todo.js";
import { fileManager } from "../utils/files.js";

class todoController {
  constructor() {
    // holds todo objects
    this.TODOS = [];
    this.initTODOS();
  }

  async createTodo(req, res) {
    // get data from POST
    const task = req.body.task;
    // create new todo object via Todo model
    const newTodo = new Todo(Math.random().toString(), task);
    // add new todo object to TODOS array
    this.TODOS.push(newTodo);
    // save data to file
    await fileManager.writeFile("./data/todos.json", this.TODOS);
    // create correct response
    res.json({
      message: "Created new object",
      newTask: newTodo,
    });
  }

  getTodos(req, res) {
    res.json({ tasks: this.TODOS });
  }

  async initTODOS() {
    const todosData = await fileManager.readFile("./data/todos.json");
    if (todosData !== null) {
      this.TODOS = todosData;
    } else {
      this.TODOS = [];
    }
  }

  updateTodo(req, res) {
    const todoId = req.params.id;
    const updatedTask = req.body.task;

    console.log(req.body);
    console.log(req.params);

    const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
      res.json({
        message: "Todo not found",
      });
      throw new Error("Todo not found");
    }

    this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
    res.json({
      message: "Updated todo",
      updatedTask: this.TODOS[todoIndex],
    });
  }

  deleteTodo(req, res) {
    const todoId = req.params.id;

    const todoIndex = this.TODOS.findIndex((todo) => todo.id === todoId);

    if (todoIndex < 0) {
      res.json({
        message: "Todo not found",
      });
      throw new Error("Todo not found");
    }

    this.TODOS.splice(todoIndex, 1);
    res.json({
      message: "Deleted todo",
    });
  }
}

export const TodoController = new todoController();
