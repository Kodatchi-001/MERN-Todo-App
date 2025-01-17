const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*---> Define schema for connecting to the database <---*/
const Account = new Schema({
    id: { type: String, required: true },
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [
        {
            id: { type: String, required: true },
            name: { type: String, required: true },
            checked: { type: Boolean, required: false, default: false }
        }
    ]
});

const AccountStructure = mongoose.model("User", Account);
module.exports = AccountStructure;