const rateLimit = require("express-rate-limit");

module.exports = rateLimit({
    windowMs: process.env.RATE_LIMIT_WINDOW_MS,
    limit: process.env.RATE_LIMIT_IP_ALLOWED_REQUESTS_NUMBER,
    message: `Exceeded number of requests: ${process.env.RATE_LIMIT_IP_ALLOWED_REQUESTS_NUMBER} per ${process.env.RATE_LIMIT_WINDOW_MS / 1000} second`,
    standardHeaders: 'draft-7',
    legacyHeaders: false
  })