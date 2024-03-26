const corsOptions = {
    origin: (origin, callback) => {
        // Allow all origins
        callback(null, true);
    },
    credentials: true,
    optionsSuccessStatus: 200
};

module.exports = corsOptions;