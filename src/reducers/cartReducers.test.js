import { cartReducers } from './cartReducers';

describe('Cart Reducer', () => {
    const initialState = { cartList: [], total: 0 };

    test('adds items to cart with ADD_TO_CART action', () => {
        const item = { id: 1, name: 'Test Book', price: 29.99 };
        const result = cartReducers(initialState, {
            type: 'ADD_TO_CART',
            payload: { products: [item], total: 29.99 }
        });
        expect(result.cartList).toContain(item);
        expect(result.total).toBe(29.99);
    });

    test('removes items from cart with REMOVE_FROM_CART action', () => {
        const stateWithItem = { cartList: [{ id: 1, name: 'Test Book' }], total: 29.99 };
        const result = cartReducers(stateWithItem, {
            type: 'REMOVE_FROM_CART',
            payload: { products: [], total: 0 }
        });
        expect(result.cartList.length).toBe(0);
        expect(result.total).toBe(0);
    });

    test('clears cart with CLEAR_CART action', () => {
        const stateWithItems = {
            cartList: [
                { id: 1, name: 'Book 1', price: 29.99 },
                { id: 2, name: 'Book 2', price: 39.99 }
            ],
            total: 69.98
        };
        const result = cartReducers(stateWithItems, {
            type: 'CLEAR_CART',
            payload: { products: [], total: 0 }
        });
        expect(result.cartList).toEqual([]);
        expect(result.total).toBe(0);
    });

    test('throws error for unknown action type', () => {
        expect(() => {
            cartReducers(initialState, { type: 'UNKNOWN_ACTION' });
        }).toThrow('No case found!');
    });
});
