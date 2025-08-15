const router = require('express').Router();
const Movie = require('../models/movieModal');
const authMiddleware = require('../middlewares/authMiddleware');

// Add a movie
router.post('/add', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie added successfully",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// Get all movies
router.get('/get-all-movies', async (req, res) => {
    try {
        const movies = await Movie.find().sort({ createdAt: -1 });
        res.send({
            success: true,
            message: "Movies fetched successfully",
            data: movies
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});


// Update a movie
router.put('/update/:id', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Movie updated successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}
);

// Delete a movie
router.delete('/delete/:id', authMiddleware, async (req, res) => {
    try {
        await Movie.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Movie deleted successfully",
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
}
);


module.exports = router;