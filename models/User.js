const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    },
    photo: {
        type: String,
        required: false
    },
    nationality: {
        type: String,
        required: true
    }
});

mongoose.model("user", UserSchema);