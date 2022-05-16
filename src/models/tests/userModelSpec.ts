const userModel = require('../userModel');
const authModel = require('../authModel');

describe('User Model', () => {
  it('should have a getAllUsers method', () => {
    expect(userModel.getAllUsers).toBeDefined();
  });
  it('should have a getUser method', () => {
    expect(userModel.getUser).toBeDefined();
  });
  it('should have a deleteMe method', () => {
    expect(userModel.deleteMe).toBeDefined();
  });
});

describe('Auth Model', () => {
  it('should have a signup method', () => {
    expect(authModel.signup).toBeDefined();
  });
  it('should have a login method', () => {
    expect(authModel.login).toBeDefined();
  });
  it('should have a protect method', () => {
    expect(authModel.protect).toBeDefined();
  });
});
