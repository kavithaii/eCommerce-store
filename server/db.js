// Import path module
const path = require('path')

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, 'db/database.sqlite')

// Create connection to SQLite database
const library = require('knex')({
  client: 'sqlite3',
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true
})

// Create a table in the database called "products"
library.schema
  // Make sure no "products" table exists
  // before trying to create new
  .hasTable('products')
    .then(async (exists) => {
      if (!exists) {
        // If no "products" table exists
        // create new, with "id", "author", "title", "pubDate" and "rating" columns
        // and use "id" as a primary identification and increment "id" with every new record (product)
        try {
          await library.schema.createTable('products', (table) => {
            table.increments('id').primary()
            table.string('name').unique()
            table.integer('price')
            table.string('description')
            table.string('imageurl')
          })
          // Log success message
          console.log('Table \'products\' created')
        } catch (error) {
          console.error(`There was an error creating table: ${error}`)
        }
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

library.schema
  .hasTable('cart')
    .then(async (exists) => {
      if (!exists) {
        // If no "cart" table exists create cart table
        try {
          await library.schema.createTable('cart', (table) => {
            table.increments('id').primary()
            table.string('customerid')
            table.integer('productid').unique()
            table.integer('quantity')
            table.string('productname')
          })
          // Log success message
          console.log('Table \'cart\' created')
        } catch (error) {
          console.error(`There was an error creating table: ${error}`)
        }
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

library.schema
  .hasTable('order')
    .then(async (exists) => {
      if (!exists) {
        // If no "order" table exists create order table
        try {
          await library.schema.createTable('order', (table) => {
            table.increments('id').primary()
            table.string('customerid')
            table.string('date')
            table.string('totalamount')
            table.string('status')
            table.string('discount')         
            table.integer('couponcode')
          })
          // Log success message
          console.log('Table \'order\' created')
        } catch (error) {
          console.error(`There was an error creating table: ${error}`)
        }
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

library.schema
  .hasTable('coupon')
    .then(async (exists) => {
      if (!exists) {
        // If no "coupon" table exists create coupon table
        try {
          await library.schema.createTable('coupon', (table) => {
            table.increments('id').primary()
            table.string('couponcode')
            table.string('customerid')
            table.string('status')
          })
          // Log success message
          console.log('Table \'order\' created')
        } catch (error) {
          console.error(`There was an error creating table: ${error}`)
        }
      }
    })
    .then(() => {
      // Log success message
      console.log('done')
    })
    .catch((error) => {
      console.error(`There was an error setting up the database: ${error}`)
    })

// Just for debugging purposes: Log all data in "products" table
library.select('*').from('products')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

library.select('*').from('cart')
  .then(data => console.log('data:', data))
  .catch(err => console.log(err))

// Export the database
module.exports = library
