const express = require('express');
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());

const tasks = [];

app.get("/tasks", (req, res) => {
    const FindTasks = tasks.filter((item) => item.checked !== true);

    if (FindTasks.length > 0) {
        res.status(200).json(FindTasks);
    } else {
        return res.status(404).json({ message: "!You,don\'t have any Task" });
    }
});


app.post("/tasks", (req, res) => {
    const { id, name, checked } = req.body;
    if (!name) { return res.json({ message: 'You dont have name' }) };
    tasks.push({ id, name, checked });
    res.status(200).json({ message: 'Task has been created!', tasks })
});

app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const FilterTasks = tasks.filter((item) => item.id !== id);

    if (FilterTasks.length !== tasks.length) {
        tasks.length = 0;
        tasks.push(...FilterTasks);
        return res.status(200).json(tasks);
    }

    return res.status(404).json({ message: 'Tasks not found' });
});

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) { return res.json({ message: 'You dont have name' }) };
    const FindTask = tasks.findIndex((item) => item.id === id);

    if (FindTask !== -1) {
        tasks[FindTask] = { ...tasks[FindTask], name };
        return res.status(200).json(tasks);
    } else {
        return res.status(404).json({ message: 'Task not found' });
    }
});

app.get("/checked-task", (req, res) => {
    const taskChecked = tasks.filter((item) => item.checked === true);
    if (taskChecked.length > 0) {
        return res.status(200).json(taskChecked);
    } else {
        return res.status(404).json({ message: "!You,don\'t have any Task Checked" });
    }
})

app.put("/checked-task/:id", (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    if (checked === undefined) { return res.status(400).json({ message: 'You must provide a check value' }) }
    const FindTask = tasks.findIndex((item) => item.id === id);

    if (FindTask !== -1) {
        tasks[FindTask] = { ...tasks[FindTask], checked }
        return res.status(200).json(tasks);
    } else {
        return res.status(404).json({ message: 'Task not found' });
    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log('PORT:', process.env.PORT);
    console.log("Hello World!");
})