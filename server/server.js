// Import dependencies
const express = require('express')
const bodyParser = require('body-parser')
const compression = require('compression')
const cors = require('cors')
const helmet = require('helmet')

// Import routes
const productsRouter = require('./routes/products-route')


// Set default port for express app
const PORT =  4001

// Create express app
const app = express()

// Apply middleware
// Note: Keep this at the top, above routes
app.use(cors())
app.use(helmet())
app.use(compression())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Implement route
app.use('/healthcheck', require('./routes/healthcheck-route'))
app.use('/products', productsRouter)

// Implement 500 error route
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something is broken.')
})

// Implement 404 error route
app.use(function (req, res, next) {
  res.status(404).send('Sorry we could not find that.')
})

// launch the server and listen only when running as a standalone process
if (!module.parent) {
  // start listening if all good... 
  app.listen(PORT, async () => {
      console.log(
          `API server is listening on port ${PORT}`
      );
  });
}

module.exports = { app, PORT } // testing purpose
