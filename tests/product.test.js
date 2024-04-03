const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../app');
require('dotenv').config();
const helper = require('../helpers/products.helper')

beforeEach(async () => {
    await mongoose.connect(process.env.MONGODB_URI)
      .then(
        () => { console.log("Connection to MOngoDB established")},
        err => { console.log("Failed to connect to MongoDB", err)}
      )
  });
  
  afterEach(async ()=>{
    await mongoose.connection.close();
  })

  describe("Request GET /api/products", () => {
    it("Returns all products", async () => {
      const res = await request(app).get('/api/users');
      expect(res.statusCode).toBe(200);
      expect(res.body.data.length).toBeGreaterThan(0)
    }, 20000)
  })

  describe('Request GET /api/products/:product', () =>{
    it('Returns a product', async ()=>{
      
      const result = await helper.findLastInsertedProduct();
      
      const res = await request(app).get('/api/products/' + result.product);
      expect(res.statusCode).toBe(200);
      expect(res.body.data.product).toBe(result.product);
      
    }, 20000)
  })

  describe('Request POST /api/products', () => {
    it('Creates a product', async () => {
      const res = await request(app)
      .post('/api/products')
      .send({
        product: "testProduct",
        cost: 10,
        description:"Test creating product",
        quantity:7
      })
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeTruthy();
    }, 20000);
  })

 

  describe("DELETE /api/products/:product", () => {
    it("Delete last inserted product", async () =>{
      const result = await helper.findLastInsertedProduct();
      const res = await request(app)
        .delete('/api/products/' + result.product);
      
      expect(res.statusCode).toBe(200)
    },20000)
  })

  describe('Request PATCH /api/products/:product', () => {
    it('Updates a product', async () => {
      const lastInsertedProduct = await helper.findLastInsertedProduct();
            const updateData = {
        cost: 15,
        description: "Test updating product",
        quantity: 5
      };
  
      const res = await request(app)
        .patch('/api/products/' + lastInsertedProduct.product)
        .send({updateData});
  
      expect(res.statusCode).toBe(200);
      expect(res.body.data).toBeTruthy();
    
    }, 22000);
  });


  