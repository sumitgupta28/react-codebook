import { filterReducer } from './filterReducers';

describe('Filter Reducer', () => {
    const initialState = {
        productList: [],
        onlyInStock: false,
        notInStock: false,
        bestSellerOnly: false,
        sortBy: 'nameAsc',
        ratings: null
    };

    test('updates product list with PRODUCT_LIST action', () => {
        const products = [
            { id: 1, name: 'Book 1' },
            { id: 2, name: 'Book 2' }
        ];
        const result = filterReducer(initialState, {
            type: 'PRODUCT_LIST',
            payload: { products }
        });
        expect(result.productList).toEqual(products);
    });

    test('toggles onlyInStock filter', () => {
        const result = filterReducer(initialState, {
            type: 'ONLY_IN_STOCK',
            payload: { onlyInStock: true }
        });
        expect(result.onlyInStock).toBe(true);
    });

    test('toggles best seller filter', () => {
        const result = filterReducer(initialState, {
            type: 'BEST_SELLER_ONLY',
            payload: { bestSellerOnly: true }
        });
        expect(result.bestSellerOnly).toBe(true);
    });

    test('updates sort option', () => {
        const result = filterReducer(initialState, {
            type: 'SORT_BY',
            payload: { sortBy: 'lowtohigh' }
        });
        expect(result.sortBy).toBe('lowtohigh');
    });

    test('updates rating filter', () => {
        const result = filterReducer(initialState, {
            type: 'RATINGS',
            payload: { ratings: '4STARABOVE' }
        });
        expect(result.ratings).toBe('4STARABOVE');
    });

    test('clears all filters', () => {
        const stateWithFilters = {
            ...initialState,
            onlyInStock: true,
            bestSellerOnly: true,
            sortBy: 'hightolow',
            ratings: '3STARABOVE'
        };
        const result = filterReducer(stateWithFilters, { type: 'CLEAR_FILTER' });
        expect(result.onlyInStock).toBe(false);
        expect(result.bestSellerOnly).toBe(false);
        expect(result.sortBy).toBe('nameAsc');
        expect(result.ratings).toBe(null);
    });

    test('throws error for unknown action type', () => {
        expect(() => {
            filterReducer(initialState, { type: 'UNKNOWN' });
        }).toThrow('No Case Found!');
    });
});
