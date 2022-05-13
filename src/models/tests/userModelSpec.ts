const userModel = require('../userModel');

describe('User Model', () => {
  describe('CRUD Functions defined', () => {
    it('should have an getAllUsers method', () => {
      expect(userModel.getAllUsers).toBeDefined();
    });
    it('should have an getUser method', () => {
      expect(userModel.getUser).toBeDefined();
    });
    it('should have an deleteMe method', () => {
      expect(userModel.deleteMe).toBeDefined();
    });
  });
});
