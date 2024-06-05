const dotenv = require("dotenv").config()
const express = require("express")
const mongoose = require('mongoose')
const itemRoute = require('./Routes/ItemRoute')
const cors = require('cors');

const app = express()
app.use(cors());
app.use(express.json())

app.use("/api", itemRoute)

const PORT = process.env.PORT || 5000

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`) 
        })
    })
    .catch((error) => 
        console.log(error)
    ) 
    

