const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Tasks = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    checked: { type: Boolean, default: false }
});

const TasksStructure = mongoose.model("Task", Tasks);
module.exports = TasksStructure;