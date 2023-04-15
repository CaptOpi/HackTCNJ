const mongoose = require('mongoose')

const UserSchema = new mongoose.SchemaType({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});