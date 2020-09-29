const express = require("express");
const router = new express.Router();
const User = require('../models/users')


//Route for creating a new user
router.post("/users", async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      res.status(201).send(user);
    } catch (e) {
      res.status(404).send(e);
    }
  });
  
  //Route for fetching multiple users
  router.get("/users", async (req, res) => {
    try {
      const users = await User.find({});
      res.send(users);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  //Route to get individula users by ID
  router.get("/users/:id", async (req, res) => {
    const _id = req.params.id;
    try {
      const user = await User.findById(_id);
      if (!user) {
        return res.status(404).send();
      }
      res.send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  
  //Update users
  router.patch("/users/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "password", "age"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
  
    if (!isValidOperation) {
      return res
        .status(400)
        .send({
          error: "Invalid update(s)!",
          reason: `Field '${updates}' doesn't exits in document`,
        });
    }
  
    try {
      const user = await User.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
      }); // new: true returns the user after updation
      if (!user) {
        return res.status(404).send("No User Found!");
      }
  
      res.status(200).send(user);
    } catch (e) {
      res.status(400).send(e);
    }
  });
  //Delete Users
  
  router.delete("/users/:id", async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id); 
      if (!user) {
        return res.status(404).send("No User Found!");
      }
      res.status(200).send(user);
    } catch (e) {
      res.status(500).send(e);
    }
  });
  

module.exports = router;