const errorHandler = (options = {}) => {
    const {
        logErrors = true,
        hideStackTrace = process.env.NODE_ENV === 'production',
        defaultMessage = "Unexpected error occurred"
    } = options;

    return (err, req, res, next) => {
        if (logErrors) {
            console.error(`[ERROR] ${err.message}`);
            if (!hideStackTrace) {
                console.error(err.stack);
            }
        }

        const statusCode = err.statusCode || 500;
        const response = {
            status: "error",
            message: err.message || defaultMessage,
            code: statusCode,
        };

        if (!hideStackTrace) {
            response.error = err.stack;
        }

        res.status(statusCode).json(response);
    };
};

module.exports = errorHandler;