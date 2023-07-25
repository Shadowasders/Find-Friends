//add models for each section of the hw
const { Schema, Types } = require('mongoose');

const userSchema = new Schema ({
    username: {
        type: String,
        unique: true,
        required: true,
        //add trim here(?)
    },

    email: {
        type: String,
        required: true,
        unique: true,

    }
})