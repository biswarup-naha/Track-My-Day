import { Router } from "express";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todo.controllers";

const router = Router();

router
  .route("/")
  .post(createTodo)
  .get(getTodos);

router
  .route("/:id")
  .put(updateTodo)
  .delete(deleteTodo);

export default router;
