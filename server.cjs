const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { ObjectId } = require('mongoose')


const { Restaurant, Users } = require('./schema.cjs')

const app = express()
app.use(bodyParser.json())
app.use(cors())
async function connectToDb() {
    try {
        await mongoose.connect('mongodb+srv://DEVADHARSHINI:22022003@cluster0.5uzsg9b.mongodb.net/Swiggy?retryWrites=true&w=majority')
        console.log(`DB Connection Established`)
        const port = process.env.port || 8000
        app.listen(port, function() {
            console.log(`Listening on port ${port}...........`)
        })
    } catch (error) {
        console.log(error)
        console.log('Couldn\'t Establish connection :(')

    }
}
connectToDb()
app.post('/add-restaurant', async function(request, response) {
    console.log(request.body)
    try {
        await Restaurant.create({
            "areaName": request.body.areaName,
            "avgRating": request.body.avgRating,
            "costForTwo": request.body.costForTwo,
            "cuisines": request.body.cuisines,
            "imageLink": request.body.imageLink,
            "name": request.body.name
        })
        response.status(201).json({
            "status": "success",
            "message": "user created"
        })
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "message": "internal server error",
            "error": error
        })
    }
})

app.get('/get-restaurant-details', async function(request, response) {
    try {
        const restaurantDetails = await Restaurant.find()
        response.status(200).json(restaurantDetails)

    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "message": "couldnot fetch details",
            "error": error
        })
    }
})

app.delete('/delete-restaurant-detail/:id', async function(request, response) {
    try {
        const restaurant = await Restaurant.findById(request.params.id)
        if (restaurant) {
            await Restaurant.findByIdAndDelete(request.params.id)
            response.status(200).json({
                "status": "success",
                "message": "deleted successfully"
            })
        } else {
            response.status(404).json({
                "status": "failure",
                "message": "entry not found"
            })
        }
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "message": "could not details",
            "error": error
        })
    }
})


app.post('/create-new-user', async function(request, response) {
    try {
        await Users.create({
            "userName": request.body.username,
            "email": request.body.email,
            "password": request.body.password,
            "contact": request.body.contact
        })
        response.status(201).json({
            "status": "success",
            "message": "User created"
        })
    } catch (error) {
        response.status(500).json({
            "status": "failure",
            "message": "Internal server error",
            "error": error
        })
    }
})
app.post('/validate-user', async function(request, response) {
    try {
        const user = await Users.findOne({
            "email": request.body.email,
            "password": request.body.password
        })
        if (user) {
            response.status(200).json({
                "messsage": "valid user"
            })

        } else {
            response.status(401).json({
                "message": "invalid user",
                "error": error
            })
        }

    } catch (error) {
        response.status(500).json({
            "message": "Internal server error"
        })
    }

})