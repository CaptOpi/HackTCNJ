require('dotenv').config({ path: '../.env' });
const { Configuration, OpenAIApi } = require("openai");
const axios = require('axios')
const express = require("express");
const app = express();
const mongoose = require('mongoose');
const UserModel = require('./models/Users')
const cors = require("cors");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_KEY,
});
const authToken = process.env.twilio_key;
const accountSid = process.env.account_Sid;
const openai = new OpenAIApi(configuration);
const client = require("twilio")(accountSid, authToken);
const secretNumber = process.env.secret_number;
const secret = process.env.secret;
app.use(express.json());
app.use(cors());
const port = process.env.PORT
const mongodb_url = process.env.MONGODB_URL;

mongoose.connect(
    mongodb_url
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
app.put('/users/addTask/:email/:password/:task', async (req, res) => { // Fetch and update user tasks using email/pass
    const {email, password, task} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found' });
    }
    const tasks = {
        name: task,
        completed: false
    }
    user.tasks.push(tasks);
    await user.save();
    res.status(200).json(user);
});
app.put('/users/completeTask/:email/:password/:taskName', async (req, res) => {
    const {email, password, taskName} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found' });
    }
    const task = user.tasks.find(task => task.name === taskName);
    task.completed = true
    await user.save();
    res.status(200).json(user);
})
app.put('/users/wipeTasks/:email/:password', async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found' });
    }
    user.tasks = []
    await user.save();
    res.status(200).json(user);
});
app.put('/users/updateGoal/:email/:password/:goal', async (req, res) => {
    const {email, password, goal} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const goals = {
        title: goal,
        completed: false
    }
    user.goal = goals;
    await user.save();
    res.status(200).json(user);
});
app.put('/users/completeGoal/:email/:password/:goal', async (req, res) => {
    const {email, password, goal} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const goals = {
        title: goal,
        completed: true
    }
    if(user.completedGoals.some(goal => goal.title === goals.title)) {
        return res.status(400).json({message: 'Duplicate goals.'}); 
    }
    user.goal.completed = true
    user.completedGoals.push(goals)
    await user.save();
    res.status(200).json(user);
});
app.put("/users/initializeAnimals/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const animal1 = {
        name: "brown",
        completed: false,
        id: 0
    }
    const animal2 = {
        name: "yellow",
        completed: false,
        id: 1
    }
    const animal3 = {
        name: "blue",
        completed: false,
        id: 2
    }
    const animal4 = {
        name: "white",
        completed: false,
        id: 3
    }
    user.animals.push(animal1, animal2, animal3, animal4);
    await user.save()
    res.status(200).json(user)
});
app.put("/users/completeAnimal/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const test = user.animals.shift();
    if(test === undefined) {
        return res.status(404).json({message: "We've run out of animals."})
    }
    test.completed = true;
    user.completedAnimals.push(test);
    await user.save();
    res.status(200).json(user);
});
app.get("/users/getAnimals/:email/:password", async (req, res) => {
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const animals = user.animals;
    res.status(200).json(animals);
});
app.get("/users/getCompletedAnimals/:email/:password", async (req, res) =>{
    const {email, password} = req.params;
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        return res.status(404).json({message: 'User not found'});
    }
    const completedAnimals = user.completedAnimals;
    res.status(200).json(completedAnimals);
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
    const user = await UserModel.findOne({email, password}).exec();
    if (!user) {
        res.status(404).json({message: "User not found."});
    } else {
        const goals = user.completedGoals;
        res.status(200).json(goals);
    }
});
app.get("/users/getUser/:email/:password", async (req, res) => {
    const { email, password } = req.params;
    const user = await UserModel.findOne({ email, password }).exec();
    if (!user) {
      return res.status(404).json({message: "User not found or password is incorrect." });
    }
    res.status(200).json({user});
});
app.post("/chatgpt", async (req, res) => {
    const input = req.body.input;
    const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: input,
        temperature: 0.7,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      });
    const chatgptResponse = response.data.choices[0].text
    res.status(200).json({ response: chatgptResponse });
});
app.post("/twilio", async (req, res) => {
    const content = req.body.contents
    client.messages
        .create({ body: content, from: secret, to: secretNumber })
            .then(message => console.log(message.sid));
})
app.listen(port, () => {
    console.log("SERVER RUNS")
});
