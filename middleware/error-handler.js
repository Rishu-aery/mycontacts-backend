const { constants } = require("../constants.js")

const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode ? err.statusCode: 500;
    switch (statusCode) {
        case constants.NOT_FOUND:
            res.json({title: "Not Found", message: err.message, stackTrace: err.stack});
            break;
        case constants.VALIDATION_ERROR:
            res.json({title: "Validation error", message: err.message, stackTrace: err.stack});
            break;
        case constants.FORBIDDEN:
            res.json({title: "Forbidden error", message: err.message, stackTrace: err.stack});
            break;
        case constants.SERVER_ERROR:
            res.json({title: "Server error", message: err.message, stackTrace: err.stack});
            break;
        case constants.UNAUTHORIZED:
            res.json({title: "Unauthorized error", message: err.message, stackTrace: err.stack});
            break;
        default:
            console.log("No error all good!");
            break;
    }
}

module.exports = {errorHandler}