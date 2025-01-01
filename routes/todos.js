import express, { Router } from "express";
import { TodoController } from "../controller/todos.js";

const router = Router();
router.post("/new-todo", (req, res) => TodoController.createTodo(req, res));

export default router;
