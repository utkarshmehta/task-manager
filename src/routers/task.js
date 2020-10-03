const express = require("express");
const { update } = require("../models/tasks");
const router = new express.Router();
const Task = require("../models/tasks");

//Route to fetch ALL Tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).send(tasks);
  } catch (e) {
    res.status(404).send(e);
  }
});

//Route to fetch Single Task by ID

router.get("/tasks/:id", async (req, res) => {
  const _id = req.params.id;
  try {
    const task = await Task.findById(_id);
    if (!task) {
      return res.sendStatus(404);
    }
    res.status(200).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Route for creating a new task
router.post("/tasks", async (req, res) => {
  const task = new Task(req.body);
  try {
    await task.save();
    res.status(201).send(task);
  } catch (e) {
    res.status(500).send(e);
  }
});

//Update Tasks
router.patch("/tasks/:id", async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["isCompleted", "description"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({
      error: "Invalid update(s)!",
      reason: `Field '${updates}' doesn't exits in document`,
    });
  }
  try {
    const task = await Task.findById(req.params.id);
    updates.forEach((update) => (task[update] = req.body[update]));
    await task.save();
    if (!task) {
      return res.status(404).send("No User Found!");
    }
    res.status(200).send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

//Delete Tasks

router.delete("/tasks/:id", async (req, res) => {
  try {
    const user = await Task.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send("No Task Found!");
    }
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

module.exports = router;
