const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
    "mongodb+srv://mongodb:YKbOaRaybaqzi5HM@cluster0.xjinasp.mongodb.net/?retryWrites=true&w=majority"
);

app.get("/users/getUsers", (req, res) => { // get a list of all defined users
    UserModel.find({}, (err, result) => {
        if (err) {
            res.status(404).json(err);
        } else {
            res.status(200).json(result);
        }
    });
});

app.post("/users/createUser", async (req, res) => { //create user with name,email,password 
    try {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({message: "Failed to create user", error: error });
    }
});
app.put('/users/updateUser/:email/:password', async (req, res) => { // Fetch and update user tasks/goal using user id
    try {
      const userId = req.params.userId;
      const user = await UserModel.findById(userId);
      if (!user) {
        return res.status(404).json({message: 'User not found' });
      }
      const { tasks, goal } = req.body;
      user.tasks = tasks;
      user.goal = goal;
      await user.save();
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({message: 'Internal server error' });
    }
});
app.get("/users/getUserTasks/:email/:password", async (req, res) => { //fetch users querying using username/password
    const {email, password } = req.params;
    const user = await UserModel.findOne({email, password }).exec();
    if (!user) {
      res.status(404).json({message: "User not found or password is incorrect." });
    } else {
      const tasks = user.tasks;
      res.status(200).json(tasks);
    }
}); 
app.get("/users/getGoal/:email/:password", async (req, res) => {
    const {email, password } = req.params;
    const user = await UserModel.findOne({email, password}).exec()
    if (!user) {
        res.status(404).json({message: "User not found."});
    } else {
        const goal = user.goal;
        res.status(200).json(goal);
    }
});
app.get("/users/getCompletedGoals/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec()
    if (!user) {
        res.status(404).json({message: "User not found."});
    } else {
        const goals = user.completedGoals;
        res.status(200).json(goals);
    }
})
app.get("/users/getUser/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    const user = await UserModel.findOne({ email, password }).exec();
    if (!user) {
      return res.status(404).json({message: "User not found or password is incorrect." });
    }
    res.status(200).json({user});
});

app.listen(5000, () => {
    console.log("SERVER RUNS")
});
