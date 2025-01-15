const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Account = new Schema({
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const AccountStructure = mongoose.model("Account", Account);
module.exports = AccountStructure;