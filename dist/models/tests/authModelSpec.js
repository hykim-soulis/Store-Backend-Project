"use strict";
const authModel = require('../authModel');
describe('Auth Model', () => {
    describe('Authentication Functions defined', () => {
        it('should have an signup method', () => {
            expect(authModel.signup).toBeDefined();
        });
        it('should have an login method', () => {
            expect(authModel.login).toBeDefined();
        });
        it('should have an protect method', () => {
            expect(authModel.protect).toBeDefined();
        });
    });
});
