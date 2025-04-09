
const errorHandler = (err, request, response, next) => {
    console.error(err.stack);

    const statusCode = response.statusCode !== 200 ? response.statusCode : 500;

    response.status(statusCode).json({
        message: err.message || "Something went wrong",
        stack: process.env.NODE_ENV === "production" ? "💥" : err.stack,
    });
};

module.exports = errorHandler;