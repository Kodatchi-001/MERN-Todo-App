const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const Tasks = require("./model/model.js");
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Tasks.find({ checked: false });
        if (tasks.length > 0) {
            return res.status(200).json(tasks);
        }
        return res.status(404).json({ message: "!You,don\'t have any Task" });
    } catch (error) {
        return console.error("Error fetching tasks:", error);
    }
});

app.post("/tasks", async (req, res) => {
    const { id, name, checked } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Task name is required" });
    };
    try {
        const newData = new Tasks({ id, name, checked });
        await newData.save();
        return res.status(200).json({ message: 'Task has been created!' });
    } catch (error) {
        return console.error("Error creating task:", error);
    }
});

app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const result = await Tasks.deleteOne({ id: id });
        if (result.deletedCount === 1) {
            return res.status(200).send('Task Deleted!');
        }
        return res.status(404).json({ message: "Task not found" });
    } catch (error) {
        return console.error("Error deleting task:", error);
    }
});

app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Task name is required!" });
    };
    try {
        const task = await Tasks.findOne({ id: id });
        if (task) {
            task.name = name;
            await task.save();
            return res.status(200).send('Task Updated!');
        }
        return res.status(404).send('Task not found!');
    } catch (error) {
        return console.error("Error updating task:", error);
    }
});

app.get("/checked-task", async (req, res) => {
    try {
        const taskChecked = await Tasks.find({ checked: true });
        if (taskChecked.length > 0) {
            return res.status(200).json(taskChecked);
        }
        return res.status(404).json({ message: "No checked tasks found!" });
    } catch (error) {
        return console.error("Error fetching checked tasks:", error);
    }
})

app.put("/checked-task/:id", async (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    if (checked === undefined) {
        return res.status(400).json({ message: "Checked value is required" });
    };
    try {
        const findTask = await Tasks.findOne({ id: id });
        if (findTask) {
            findTask.checked = checked;
            await findTask.save();
            return res.status(200).json({ message: "Task status updated!" });
        }
        return res.status(404).json({ message: 'Task not found' });
    } catch (error) {
        return console.error("Error updating task status:", error);
    }
});


mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const port = process.env.PORT
        app.listen(port || 3000, () => {
            console.log(`Server is running on port ${port}`);
        })
    }).catch((error) => {
        console.error("Error connecting to the database:", error);
    })
