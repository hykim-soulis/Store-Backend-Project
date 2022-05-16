const productModel = require('../productModel');

describe('Product Model', () => {
  it('should have a getAllProducts method', () => {
    expect(productModel.getAllProducts).toBeDefined();
  });
  it('should have a getProduct method', () => {
    expect(productModel.getProduct).toBeDefined();
  });
  it('should have a createProduct method', () => {
    expect(productModel.createProduct).toBeDefined();
  });
  it('should have a updateProduct method', () => {
    expect(productModel.updateProduct).toBeDefined();
  });
  it('should have a deleteProduct method', () => {
    expect(productModel.deleteProduct).toBeDefined();
  });
  it('should have a top5Popular method', () => {
    expect(productModel.getTop5Popular).toBeDefined();
  });
});
