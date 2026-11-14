const taskController = require("../controllers/taskController.js");
const authController = require("../controllers/authController.js");

const { allTask, createTask, deleteTask, updateTask, deleteAllTask } =
  taskController;

const express = require("express");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, allTask)
  .post(createTask)
  .delete(deleteAllTask);

router.route("/:id").delete(deleteTask).patch(updateTask);

module.exports = router;
