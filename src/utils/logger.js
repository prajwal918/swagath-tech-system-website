// Custom Logger Utility
const logger = {
    info: (msg) => console.log([INFO] ),
    error: (msg, err) => console.error([ERROR] , err),
    warn: (msg) => console.warn([WARN] )
};
module.exports = logger;
