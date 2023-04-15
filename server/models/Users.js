const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 40
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                return /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(v);
            },
            message: props =>`${props.value} is not a valid email.`  
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20
    }
});

const UserModel = mongoose.model("users", UserSchema);
module.exports = UserModel