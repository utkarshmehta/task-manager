require("./db/mongoose");
const Task = require("./models/tasks");
const User = require("./models/users");
const express = require("express");
const { update } = require("./models/tasks");
const ObjectId = require('mongoose').Types.ObjectId; //TODO - implement error checking for invalid ObjectID
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json()); // auto parses json coming in the request
app.use(userRouter);
app.use(taskRouter);

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
