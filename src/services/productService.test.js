import { getProductDetails, getFeaturedProducts, getProductList } from './productService';

beforeEach(() => {
    jest.resetAllMocks();
    process.env.REACT_APP_HOST = 'http://localhost:8000';
});

describe('productService', () => {
    test('getProductDetails fetches product by id', async () => {
        const mockProduct = { id: 1, name: 'Test Book' };
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => mockProduct });

        const result = await getProductDetails(1);

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/444/products/1');
        expect(result).toEqual(mockProduct);
    });

    test('getFeaturedProducts fetches featured endpoint', async () => {
        const mockFeatured = [{ id: 2, name: 'Featured' }];
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => mockFeatured });

        const result = await getFeaturedProducts();

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/444/featured_products');
        expect(result).toEqual(mockFeatured);
    });

    test('getProductList builds URL with searchTerm', async () => {
        const products = [{ id: 3 }];
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => products });

        const result = await getProductList('Harry');

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/444/products?name_like=Harry');
        expect(result).toEqual(products);
    });

    test('getProductList handles empty searchTerm', async () => {
        const products = [{ id: 4 }];
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => products });

        const result = await getProductList();

        expect(global.fetch).toHaveBeenCalledWith('http://localhost:8000/444/products?name_like=');
        expect(result).toEqual(products);
    });
});
