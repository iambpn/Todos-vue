const express = require("express");
const cors = require("cors");
const {sequelize, tasks} = require("./models");

let app = express();
let port = 3000;

app.use(cors())
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Need to Link Dist index here");
})

app.get("/api/todo", async (req, res) => {
    try {
        const allTasks = await tasks.findAll();
        res.json(allTasks);
    } catch (e) {
        res.status(500).json({message: e.message || "Failed to fetch data from server."});
    }
});

app.post("/api/addTodo", async (req, res) => {
    try {
        const {content} = req.body;
        const task = await tasks.create({content})
        res.json(task)
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message || "Server Error"});
    }
})

app.put("/api/todo/completed", async (req, res) => {
    try {
        const {id} = req.body;
        const task = await tasks.findOne({where: {uuid: id}});
        task.completed = !task.completed;
        await task.save();
        res.json({message: "Todo Updated."});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message || "Error while updating database."});
    }
});

app.delete("/api/todo", async (req, res) => {
    try {
        const {id} = req.body;
        const task = await tasks.findOne({where: {uuid: id}});
        await task.destroy();
        res.json({message: "Todo Deleted."});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: e.message || "Error while updating database."});
    }
});

let server = app.listen(port, async () => {
    console.log("Express Server Running on port :" + port);
    await sequelize.authenticate();
    console.log("Connected to Database.");
})