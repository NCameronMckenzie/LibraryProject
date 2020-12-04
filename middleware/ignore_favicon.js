//prevent superflous calls

const ignore_favicon = function (req, res, next) {
    if (req.originalUrl.includes('favicon.ico')) {{
        res.status(204).end()
    }};

    next();
};

module.exports = ignore_favicon;