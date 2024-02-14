const mongoose = require('mongoose')

const restaurantsSchema = new mongoose.Schema({
    areaName: {
        type: String
    },
    avgRating: {
        type: Number
    },
    costForTwo: {
        type: String
    },
    cuisines: {
        type: Array
    },
    imageLink: {
        type: String
    },
    name: {
        type: String
    }
})
const Restaurant = mongoose.model('restaurantdetail', restaurantsSchema)

const userSchema = new mongoose.Schema({
    contact: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,

    }


}, { versionKey: false })

// model
const Users = mongoose.model('userDetail', userSchema)

// Exporting the model
module.exports = { Users, Restaurant }