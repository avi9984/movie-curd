const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const { default: mongoose } = require('mongoose');
require('dotenv').config()
const movieRoutes = require('./routes/movie')


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

mongoose.connect(process.env.MONGO_URI).then(() => console.log("MongoDB is connected...")).catch((err) => console.log(err))

app.use('/movie', movieRoutes)
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`)
})
