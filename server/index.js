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
            res.json(result);
        }
    });
});

app.post("/users/createUser", async (req, res) => { //create user with name,email,password 
    try {
      const user = req.body;
      const newUser = new UserModel(user);
      await newUser.save();
      res.json(user);
    } catch (error) {
      res.status(500).json({message: "Failed to create user", error: error });
    }
});
app.put('/users/:userId', async (req, res) => { // Fetch and update user tasks/goal using user id
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
      res.json(user);
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
      res.json(tasks);
    }
}); 
app.get("/users/getGoal/:email/:password", async (req, res) => {
    const {email, password } = req.params;
    const user = await UserModel.findOne({email, password}).exec()
    if (!user) {
        res.status(404).json({message: "User not found."});
    } else {
        const goal = user.goal;
        res.json(goal);
    }
});
app.get("/users/getCompletedGoals/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec()
    if (!user) {
        res.status(404).json({message: "User not found."});
    } else {
        const goals = user.completedGoals;
        res.json(goals);
    }
})
app.get("/users/getUser"), async (req, res) => { //fetch a user via querying email/pass for comparing login
    const {email, password} = req.params;
    const user = UserModel.findOne({email, password}).exec();
    if (!user) {
        res.status(404).json({message: "User not found or password is incorrect."});
    } else {
        res.status(200).json({message: "User was found."})
    }
}

app.listen(5000, () => {
    console.log("SERVER RUNS")
});
