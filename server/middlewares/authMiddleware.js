const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token) {
            return res.status(401).send({
                success: false,
                message: 'No token provided'
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Corrected: Attach userId directly to the req object
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).send({
            success: false,
            message: 'Unauthorized'
        });
    }
}