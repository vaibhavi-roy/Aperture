const router = require('express').Router();
const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authMiddleware = require('../middlewares/authMiddleware');

// Register a new user
router.post('/register', async (req, res) => {
    try {
        const userExists = await User.findOne({ email: req.body.email });
        if (userExists) {
            return res.send({
                success: false,
                message: 'User already exists with this email',
                userExists: true,
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });
        await newUser.save();

        res.send({
            success: true,
            message: 'User registered successfully. Please login.',
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


// Login a user
router.post('/login', async (req, res) => {
    try {
        // Check if user exists
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return res.send({
                success: false,
                message: 'User does not exist',
                userDoesNotExist: true,
            });
        }

        // Check if the password is valid
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return res.send({
                success: false,
                message: 'Invalid credentials',
            });
        }

        // Create and assign a token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // Send success response with token
        res.send({
            success: true,
            message: 'User logged in successfully',
            data: token
        });

    } catch (error) {
        res.send({
            success: false,
            message: error.message,
        });
    }
});


// Get current user details
router.get('/get-current-user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId).select('-password');
        if (!user) {
            return res.send({
                success: false,
                message: 'User not found'
            });
        }
        res.send({
            success: true,
            message: 'User details fetched successfully',
            data: user
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        });
    }
});

module.exports = router;