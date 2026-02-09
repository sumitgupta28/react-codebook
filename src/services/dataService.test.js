import { getUserOrder, createOrder, getLoggedInUserDetails } from './dataService';

beforeEach(() => {
    jest.resetAllMocks();
    sessionStorage.clear();
});

describe('dataService', () => {
    test('getUserOrder uses cbid and token from sessionStorage', async () => {
        sessionStorage.setItem('cbid', JSON.stringify(10));
        sessionStorage.setItem('token', JSON.stringify('abc-123'));

        const mockOrders = [{ id: 1 }];
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => mockOrders });

        let result;
        try {
            result = await getUserOrder();
        } catch (err) {
            console.error('DEBUG getUserOrder error:', err);
            throw err;
        }

        expect(global.fetch).toHaveBeenCalledWith(`${process.env.DOWNSTREAM_SERVICE_HOST || 'http://localhost:8000'}/660/orders?user.id=10`, expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({ Authorization: 'Bearer abc-123' })
        }));
        expect(result).toEqual(mockOrders);
    });

    test('createOrder posts order with correct body and auth header', async () => {
        sessionStorage.setItem('token', JSON.stringify('token-xyz'));
        const cartList = [{ id: 1, name: 'A' }, { id: 2, name: 'B' }];
        const total = 100;
        const user = { id: 5, name: 'Bob', email: 'bob@example.com' };

        const createdOrder = { id: 99, total };
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 201, statusText: 'Created', json: async () => createdOrder });

        const result = await createOrder(cartList, total, user);

        expect(global.fetch).toHaveBeenCalledWith(`${process.env.DOWNSTREAM_SERVICE_HOST || 'http://localhost:8000'}/660/orders`, expect.objectContaining({
            method: 'POST',
            headers: expect.objectContaining({ Authorization: 'Bearer token-xyz' }),
            body: expect.any(String)
        }));

        const sentBody = JSON.parse(global.fetch.mock.calls[0][1].body);
        expect(sentBody.products).toEqual(cartList);
        expect(sentBody.total).toBe(total);
        expect(sentBody.quantity).toBe(cartList.length);
        expect(sentBody.user).toEqual({ name: user.name, email: user.email, id: user.id });
        expect(result).toEqual(createdOrder);
    });

    test('getLoggedInUserDetails fetches user by cbid with token', async () => {
        sessionStorage.setItem('cbid', JSON.stringify(20));
        sessionStorage.setItem('token', JSON.stringify('tok-20'));

        const userDetails = { id: 20, email: 'x@x' };
        global.fetch = jest.fn().mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => userDetails });

        const result = await getLoggedInUserDetails();

        expect(global.fetch).toHaveBeenCalledWith(`${process.env.DOWNSTREAM_SERVICE_HOST || 'http://localhost:8000'}/600/users/20`, expect.objectContaining({
            method: 'GET',
            headers: expect.objectContaining({ Authorization: 'Bearer tok-20' })
        }));

        expect(result).toEqual(userDetails);
    });
});
