const orderModel = require('../orderModel');

describe('Test Order Model functions', () => {
  it('should have a getAllOrders method', () => {
    expect(orderModel.getAllOrders).toBeDefined();
  });
  it('should have a createOrder method', () => {
    expect(orderModel.createOrder).toBeDefined();
  });
  it('should have a deleteOrder method', () => {
    expect(orderModel.deleteOrder).toBeDefined();
  });
  it('should have an updateOrder method', () => {
    expect(orderModel.updateOrder).toBeDefined();
  });
});
