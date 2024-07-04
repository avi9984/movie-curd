const Movie = require('../models/movie');


const addMovie = async (req, res) => {
    try {
        const { name, img, summary } = req.body;
        if (!(name && img && summary)) {
            return res.status(400).json({ error: "Please fill all the fields" })
        }
        let countMovie = await Movie.find().sort({ movieId: -1 }).limit(1).select({ _id: 0, movieId: 1 });
        let id;
        if (countMovie.length === 0) {
            id = 1;
        } else {
            id = (countMovie[0].movieId) + 1;
        }
        const obj = {
            movieId: id,
            name,
            img,
            summary
        }
        const movie = await Movie.create(obj);
        return res.status(201).json({ status: true, message: "Movie Added Successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getAllMovies = async (req, res) => {
    try {
        const movie = await Movie.find({});
        if (!movie) {
            return res.status(404).json({ status: false, message: "No Movies Found" })
        }
        return res.status(200).json({ status: true, message: "Movies Found", data: movie })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const getMovieById = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findOne({ movieId });
        if (!movie) {
            return res.status(404).json({ status: false, message: "No Movies Found" })
        }
        return res.status(200).json({ status: true, message: "Movies Found by id", data: movie })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" });
    }
}
const updateMovie = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const { name, img, summery } = req.body;
        const movie = await Movie.findOneAndUpdate({ movieId }, {
            $set: {
                name: name ? req.body.name : name,
                img: img ? req.body.img : img,
                summery: summery ? req.body.summery : summery
            }
        }, { new: true });
        if (!movie) {
            return res.status(404).json({ status: false, message: "No Movies Found" })
        }
        return res.status(200).json({ status: true, message: "Movie Updated Successfully", })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}

const deleteMovie = async (req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await Movie.findOneAndDelete({ movieId });
        if (!movie) {
            return res.status(404).json({ status: false, message: "No Movies Found" })
        }
        return res.status(200).json({ status: true, message: "Movie Deleted Successfully", })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: false, message: "Internal Server Error" })
    }
}
module.exports = { addMovie, getAllMovies, getMovieById, updateMovie, deleteMovie }