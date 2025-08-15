const router = require('express').Router();
const Movie = require('../models/movieModal');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/movies', authMiddleware, async (req, res) => {
    try {
        const newMovie = new Movie(req.body);
        await newMovie.save();
        res.send({
            success: true,
            message: "Movie created successfully",
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});

// router.get('/movies', async (req, res) => {
//     try {
//         const movies = await Movie.find();
//         res.send({
//             success: true,
//             movies
//         });
//     } catch (error) {
//         res.send({
//             success: false,
//             message: error.message
//         });
//     }
// });

module.exports = router;
