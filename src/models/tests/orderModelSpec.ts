const orderModel = require('../orderModel');

describe('Order Model', () => {
  describe('CRUD Functions defined', () => {
    it('should have an getAllOrders method', () => {
      expect(orderModel.getAllOrders).toBeDefined();
    });
    it('should have an createOrder method', () => {
      expect(orderModel.createOrder).toBeDefined();
    });
    it('should have an deleteOrder method', () => {
      expect(orderModel.deleteOrder).toBeDefined();
    });
    it('should have an updateOrder method', () => {
      expect(orderModel.updateOrder).toBeDefined();
    });
  });
});
