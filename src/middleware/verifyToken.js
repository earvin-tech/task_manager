// verifyToken.js - Annotated for clarity and documentation
const jwt = require("jsonwebtoken");

const verifyToken = (request, response, next) => {
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return response.status(401).json({
            message: "Unauthorized: No token provided"
        });
    }

    const token = authHeader.split(" ")[1];

// Begin try block to handle potential runtime errors
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        request.user = decoded;

        next();
// Catch block to forward or log errors
    } catch (err) {
        return response.status(401).json({
            message: "Unauthorized: Invalid token"
        });
    }
};

module.exports = { verifyToken };