const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    movieId: { type: Number },
    name: { type: String, required: true },
    img: { type: String, required: true },
    summary: { type: String, required: true }
}, { timestamps: true, versionKey: false })


const Movie = mongoose.model("movie", movieSchema);
module.exports = Movie;