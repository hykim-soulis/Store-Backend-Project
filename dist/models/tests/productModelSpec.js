"use strict";
const productModel = require('../productModel');
describe('Product Model', () => {
    describe('CRUD Functions defined', () => {
        it('should have an getAllProducts method', () => {
            expect(productModel.getAllProducts).toBeDefined();
        });
        it('should have an getProduct method', () => {
            expect(productModel.getProduct).toBeDefined();
        });
        it('should have an createProduct method', () => {
            expect(productModel.createProduct).toBeDefined();
        });
        // it('should have an updateProduct method', () => {
        //   expect(productModel.updateProduct).toBeDefined();
        // });
        it('should have an deleteProduct method', () => {
            expect(productModel.deleteProduct).toBeDefined();
        });
    });
    describe('CRUD functions work well', () => {
        // it('create method should add a product', async () => {
        //   const result = await productModel.createProduct({
        //     name: 'Bridge to Terabithia',
        //     price: 250,
        //     category: 'Childrens',
        //   });
        //   expect(result).toEqual({
        //     product_id: 1,
        //     name: 'Bridge to Terabithia',
        //     price: 250,
        //     category: 'Childrens',
        //   });
        // });
        it('getAllProducts method should return a list of products', async () => {
            const result = await productModel.getAllProducts();
            // console.log([
            //   {
            //     product_id: 1,
            //     name: 'Bridge to Terabithia',
            //     price: 250,
            //     category: 'Childrens',
            //   },
            // ]);
            expect(result).toBe([]);
        });
        // it('getProduct method should return the correct product', async () => {
        //   const result = await productModel.getProduct(1);
        //   expect(result).toEqual([
        //     {
        //       product_id: 1,
        //       name: 'Bridge to Terabithia',
        //       price: 250,
        //       category: 'Childrens',
        //     },
        //   ]);
        // });
        // // it('updateProduct method should return a list of products', async () => {
        // //   const result = await productModel.updateProduct(1, { price: 300 });
        // //   expect(result).toEqual([
        // //     {
        // //       product_id: 1,
        // //       name: 'Bridge to Terabithia',
        // //       price: 300,
        // //       category: 'Childrens',
        // //     },
        // //   ]);
        // // });
        // it('deleteProduct method should remove the book', async () => {
        //   productModel.deleteProduct(1);
        //   const result = await productModel.getAllProducts();
        //   expect(result).toEqual([]);
        // });
    });
});
