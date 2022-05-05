import { Product, ProductStore } from '../productModel';

const store = new ProductStore();

describe('Product Model', () => {
  describe('CRUD Functions defined', () => {
    it('should have an getAllProducts method', () => {
      expect(store.getAllProducts).toBeDefined();
    });
    it('should have an getProduct method', () => {
      expect(store.getProduct).toBeDefined();
    });
    it('should have an createProduct method', () => {
      expect(store.createProduct).toBeDefined();
    });
    // it('should have an updateProduct method', () => {
    //   expect(store.updateProduct).toBeDefined();
    // });
    it('should have an deleteProduct method', () => {
      expect(store.deleteProduct).toBeDefined();
    });
  });

  describe('CRUD functions work well', () => {
    it('create method should add a product', async () => {
      const result = await store.createProduct({
        product_id: 1,
        name: 'Bridge to Terabithia',
        price: 250,
        category: 'Childrens',
      });
      expect(result).toEqual({
        product_id: 1,
        name: 'Bridge to Terabithia',
        price: 250,
        category: 'Childrens',
      });
    });

    it('getAllProducts method should return a list of products', async () => {
      const result = await store.getAllProducts();
      expect(result).toEqual([
        {
          product_id: 1,
          name: 'Bridge to Terabithia',
          price: 250,
          category: 'Childrens',
        },
      ]);
    });

    it('getProduct method should return the correct product', async () => {
      const result = await store.getProduct(1);
      expect(result).toEqual([
        {
          product_id: 1,
          name: 'Bridge to Terabithia',
          price: 250,
          category: 'Childrens',
        },
      ]);
    });

    // it('updateProduct method should return a list of products', async () => {
    //   const result = await store.updateProduct(1, { price: 300 });
    //   expect(result).toEqual([
    //     {
    //       product_id: 1,
    //       name: 'Bridge to Terabithia',
    //       price: 300,
    //       category: 'Childrens',
    //     },
    //   ]);
    // });

    it('deleteProduct method should remove the book', async () => {
      store.deleteProduct(1);
      const result = await store.getAllProducts();
      expect(result).toEqual([]);
    });
  });
});
