const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const Tasks = require("./model/taskModel.js");
const Account = require("./model/accountModel.js");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Tasks.find({ checked: false });
        if (tasks.length > 0) {
            return res.status(200).json(tasks);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Error fetching tasks" });
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
        return res.status(201).json({ message: 'Task has been created!' });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Error creating task" });
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
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Error deleting task" });
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
            return res.status(200).json('Task Updated!');
        }
        return res.status(404).json('Task not found!');
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Error updating task" });
    }
});

app.get("/checked-task", async (req, res) => {
    try {
        const taskChecked = await Tasks.find({ checked: true });
        if (taskChecked.length > 0) {
            return res.status(200).json(taskChecked);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error("Error fetching checked tasks:", error);
        return res.status(500).json({ message: "Error fetching checked tasks" });
    }
});

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
        console.error("Error updating checked tasks:", error);
        return res.status(500).json({ message: "Error updating checked tasks" });
    }
});

app.get("/accounts", async (req, res) => {
    try {
        const accounts = await Account.find();
        if (accounts.length > 0) {
            return res.status(200).json(accounts);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error("Error fetching accounts:", error);
        return res.status(500).json({ message: "Error fetching accounts" });
    }
})

app.post("/register", async (req, res) => {
    const { id, fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "You don't have all information" });
    }
    try {
        const existingAccount = await Account.findOne({ email });
        if (existingAccount) {
            return res.status(400).json({ message: "Email already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            id: id,
            fullName: fullName,
            email: email,
            password: hashedPassword
        };
        const token = jwt.sign(userData, process.env.JWT_SECRET);
        if (token) {
            const newAccount = new Account(userData);
            await newAccount.save();
            return res.status(201).json({ message: 'Account has been created!', token });
        }
    } catch (error) {
        console.error("Error creating account:", error);
        return res.status(500).json({ message: "Error creating account" });
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Information account is required" });
    }
    try {
        const existingAccount = await Account.findOne({ email });
        if (!existingAccount) {
            return res.status(404).json({ message: "Account not found" });
        }
        const isPasswordValid = await bcrypt.compare(password, existingAccount.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const userData = {
            id: existingAccount.id,
            email: existingAccount.email
        };
        const token = jwt.sign(userData, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging:", error);
        return res.status(500).json({ message: "Error logging" });
    }
})

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const port = process.env.PORT
        app.listen(port || 3000, () => {
            console.log(`Server is running on port ${port}`);
        })
    }).catch((error) => {
        console.error("Error connecting to the database:", error);
    })
