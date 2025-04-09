const request = require('supertest');
const app = require('../app'); // Ensure app.js exports the express app

let createdProductId;

describe('Product API', () => {

  // Test case for creating a new product
  it('should create a new product', async () => {
    const res = await request(app)
      .post('/api/v1/products')
      .send({
        name: 'Test Product',
        price: 100,
        quantity: 10,
        description: 'A sample test product'
      })
      .set('Content-Type', 'application/json')
      .expect(201); // Expecting status 201 Created

    expect(res.body).toHaveProperty('name', 'Test Product');
    expect(res.body).toHaveProperty('price', 100);
    expect(res.body).toHaveProperty('quantity', 10);
    expect(res.body).toHaveProperty('description', 'A sample test product');

    createdProductId = res.body._id; // Store the product ID for future tests
  });

  // Test case for retrieving all products
  it('should retrieve all products', async () => {
    const res = await request(app)
      .get('/api/v1/products')
      .expect(200); // Expecting status 200 OK

    expect(res.body).toBeInstanceOf(Array);
    expect(res.body.length).toBeGreaterThan(0); // Ensure the list isn't empty
  });

  // Test case for retrieving a product by ID
  it('should retrieve a product by ID', async () => {
    const res = await request(app)
      .get(`/api/v1/products/${createdProductId}`)
      .expect(200); // Expecting status 200 OK

    expect(res.body).toHaveProperty('_id', createdProductId);
    expect(res.body).toHaveProperty('name', 'Test Product');
  });

  // Test case for updating a product
  it('should update a product', async () => {
    const res = await request(app)
      .put(`/api/v1/products/${createdProductId}`)
      .send({
        name: 'Updated Product',
        price: 150,
        quantity: 5,
        description: 'Updated product description'
      })
      .set('Content-Type', 'application/json')
      .expect(200); // Expecting status 200 OK

    expect(res.body).toHaveProperty('name', 'Updated Product');
    expect(res.body).toHaveProperty('price', 150);
    expect(res.body).toHaveProperty('quantity', 5);
    expect(res.body).toHaveProperty('description', 'Updated product description');
  });

  // Test case for deleting a product
  it('should delete a product', async () => {
    const res = await request(app)
      .delete(`/api/v1/products/${createdProductId}`)
      .expect(204); // Expecting status 204 No Content

    // Ensure the product no longer exists
    await request(app)
      .get(`/api/v1/products/${createdProductId}`)
      .expect(404); // Expecting status 404 Not Found
  });

  // Test case for handling non-existent product (GET/DELETE)
  it('should return 404 for a non-existent product', async () => {
    const nonExistentId = '60adf1b7e7d6a01f62345679'; // ID that doesn't exist

    // Test GET for non-existent product
    const resGet = await request(app)
      .get(`/api/v1/products/${nonExistentId}`)
      .expect(404); // Expecting status 404 Not Found
    expect(resGet.body.message).toBe('Product not found');

    // Test DELETE for non-existent product
    const resDelete = await request(app)
      .delete(`/api/v1/products/${nonExistentId}`)
      .expect(404); // Expecting status 404 Not Found
    expect(resDelete.body.message).toBe('Product not found');
  });

});
