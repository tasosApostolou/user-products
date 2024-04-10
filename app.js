const express = require('express');
const app = express();
const mongoose = require('mongoose');

require('dotenv').config();

app.use(express.urlencoded({ extended: true }));
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger');

mongoose.connect(process.env.MONGODB_URI)
  .then(
    () => { console.log("Connection to mongodb established")},
    err => { console.log("Failed to connect to mongodb", err)}
  );

const cors = require('cors');
app.use(cors({
  origin: '*'
}))

const user = require('./routes/user.route');
const userProduct = require('./routes/user.products.routes')
const product = require('./routes/product.route');

app.use('/', express.static('files'));
app.use('/api/users', user)
app.use('/api/user-products', userProduct)
app.use('/api/products',product)

app.use('/api-docs', 
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument.options)
)

// app.listen(3000, ()=>{
//   console.log("Server is up");
// })

module.exports = app;