const express = require('express');
const cors = require("cors");
const mongoose = require('mongoose');
const Account = require("./model/userModel.js");
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());
app.use(cors());

/*---> Middleware to verify if a token exists <---*/
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Token not provided!" });
    }
    jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
        if (error) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.user = user
        next();
    })
}
/*---> Endpoint to get all unchecked tasks from the database <---*/
app.get("/tasks", authenticateToken, async (req, res) => {
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const filterTasks = user.tasks.filter((item) => item.checked === false)
        if (filterTasks.length > 0) {
            return res.status(200).json(filterTasks);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return res.status(500).json({ message: "Error fetching tasks" });
    }
})
/*---> Endpoint to add a new task to the database <---*/
app.post("/tasks", authenticateToken, async (req, res) => {
    const { id, name, checked } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Task name is required" });
    };
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        user.tasks.push({ id, name, checked });
        await user.save();
        return res.status(201).json({ message: 'Task has been created!' });
    } catch (error) {
        console.error("Error creating task:", error);
        return res.status(500).json({ message: "Error creating task" });
    }
})
/*---> Endpoint to delete a task from the database <---*/
app.delete("/tasks/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const filterTasks = user.tasks.filter((item) => item.id !== id);
        if (filterTasks) {
            user.tasks = filterTasks;
            await user.save();
            return res.status(200).send('Task Deleted!');
        }
        return res.status(404).json({ message: "Task not found" });
    } catch (error) {
        console.error("Error deleting task:", error);
        return res.status(500).json({ message: "Error deleting task" });
    }
})
/*---> Endpoint to update a task in the database <---*/
app.put("/tasks/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({ message: "Task name is required!" });
    };
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const findTask = user.tasks.find((item) => item.id === id);
        if (findTask) {
            findTask.name = name;
            await user.save();
            return res.status(200).json('Task Updated!');
        }
        return res.status(404).json('Task not found!');
    } catch (error) {
        console.error("Error updating task:", error);
        return res.status(500).json({ message: "Error updating task" });
    }
})
/*---> Endpoint to get all checked tasks from the database <---*/
app.get("/checked-task", authenticateToken, async (req, res) => {
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const taskChecked = user.tasks.filter((item) => item.checked === true);
        if (taskChecked.length > 0) {
            return res.status(200).json(taskChecked);
        }
        return res.status(200).json([]);
    } catch (error) {
        console.error("Error fetching checked tasks:", error);
        return res.status(500).json({ message: "Error fetching checked tasks" });
    }
});
/*---> Endpoint to update the checked status of a task by ID <---*/
app.put("/checked-task/:id", authenticateToken, async (req, res) => {
    const { id } = req.params;
    const { checked } = req.body;
    if (checked === undefined) {
        return res.status(400).json({ message: "Checked value is required" });
    };
    try {
        const user = await Account.findOne({ id: req.user.id });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const findTask = user.tasks.find((item) => item.id === id);
        if (findTask) {
            findTask.checked = checked;
            await user.save();
            return res.status(200).json({ message: "Task status updated!" });
        }
        return res.status(404).json({ message: 'Task not found' });
    } catch (error) {
        console.error("Error updating checked tasks:", error);
        return res.status(500).json({ message: "Error updating checked tasks" });
    }
});
/*---> Endpoint to get all accounts from the database (for admin use) <---*/
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
});
/*---> Endpoint to create a new account and generate a token <---*/
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
        /*---> Hash password for better security <---*/
        const hashedPassword = await bcrypt.hash(password, 10);
        const userData = {
            id: id,
            fullName: fullName,
            email: email,
            password: hashedPassword
        };
        /*---> Generate a token using user info and secret key <---*/
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
/*---> Endpoint to log in and generate a token <---*/
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
        /*---> Compare the provided password with the password in the database <---*/
        const isPasswordValid = await bcrypt.compare(password, existingAccount.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const userData = {
            id: existingAccount.id,
            email: existingAccount.email
        };
        /*---> Generate a new token <---*/
        const token = jwt.sign(userData, process.env.JWT_SECRET);
        return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        console.error("Error logging:", error);
        return res.status(500).json({ message: "Error logging" });
    }
})
/*---> Connect to the database and start the server <---*/
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        const port = process.env.PORT
        app.listen(port || 3000, () => {
            console.log(`Server is running on port ${port}`);
        })
    }).catch((error) => {
        console.error("Error connecting to the database:", error);
    })
