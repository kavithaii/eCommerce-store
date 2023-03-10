const express = require('express')

const router = express.Router({})
router.get('/', async (_req, res, _next) => {
    const healthcheck = {
        uptime: process.uptime(),
        message: 'OK',
        timestamp: Date.now()
    };
    try {
        console.log('>>>', healthcheck)
        res.send(healthcheck)
    } catch (e) {
        healthcheck.message = e
        res.status(503).send()
    }
})

// export router
module.exports = router