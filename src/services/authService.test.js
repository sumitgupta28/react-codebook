import { userLogin, logoutUser, regiesterUser } from './authService';

global.fetch = jest.fn();

describe('Auth Service', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
        fetch.mockClear();
    });

    describe('userLogin', () => {
        test('stores token and user id on successful login', async () => {
            const mockResponse = {
                accessToken: 'test-token-123',
                user: { id: 1, email: 'test@example.com' }
            };

            fetch.mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => mockResponse });

            await userLogin({ email: 'test@example.com', password: 'password' });

            expect(sessionStorage.getItem('token')).toBe(JSON.stringify('test-token-123'));
            expect(sessionStorage.getItem('cbid')).toBe(JSON.stringify(1));
        });

        test('calls correct login endpoint', async () => {
            const mockResponse = { accessToken: 'test-token', user: { id: 1 } };
            fetch.mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => mockResponse });

            await userLogin({ email: 'test@example.com', password: 'password' });

            expect(fetch).toHaveBeenCalledWith(
                `${process.env.DOWNSTREAM_SERVICE_HOST || 'http://localhost:8000'}/login`,
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'content-Type': 'application/json' }
                })
            );
        });

        test('does not store token if login fails', async () => {
            fetch.mockResolvedValueOnce({ ok: true, status: 200, statusText: 'OK', json: async () => ({ error: 'Invalid credentials' }) });

            await userLogin({ email: 'test@example.com', password: 'wrong' });

            expect(sessionStorage.getItem('token')).toBeNull();
        });
    });

    describe('logoutUser', () => {
        test('removes token from session storage', () => {
            sessionStorage.setItem('token', JSON.stringify('test-token'));
            sessionStorage.setItem('cbid', JSON.stringify(1));

            logoutUser();

            expect(sessionStorage.getItem('token')).toBeNull();
            expect(sessionStorage.getItem('cbid')).toBeNull();
        });
    });

    describe('regiesterUser', () => {
        test('calls correct register endpoint', async () => {
            const mockResponse = { id: 1, email: 'newuser@example.com' };
            fetch.mockResolvedValueOnce({ ok: true, status: 201, statusText: 'Created', json: async () => mockResponse });

            await regiesterUser({ email: 'newuser@example.com', password: 'password' });

            expect(fetch).toHaveBeenCalledWith(
                `${process.env.DOWNSTREAM_SERVICE_HOST || 'http://localhost:8000'}/register`,
                expect.objectContaining({
                    method: 'POST',
                    headers: { 'content-Type': 'application/json' }
                })
            );
        });

        test('returns user data on successful registration', async () => {
            const mockResponse = { id: 1, email: 'newuser@example.com' };
            fetch.mockResolvedValueOnce({ ok: true, status: 201, statusText: 'Created', json: async () => mockResponse });

            const result = await regiesterUser({ email: 'newuser@example.com', password: 'password' });

            expect(result).toEqual(mockResponse);
        });
    });
});
