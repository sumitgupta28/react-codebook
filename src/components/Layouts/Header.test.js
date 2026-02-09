import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Header } from './Header';
import * as authService from '../../services';

jest.mock('../../services', () => ({
    getLoggedInUserDetails: jest.fn(),
    logoutUser: jest.fn()
}));

jest.mock('../../context', () => ({
    useCart: () => ({ cartList: [1, 2] })
}));

jest.mock('../Sections/Search', () => ({
    Search: ({ setSearchSection }) => (
        <div data-testid="search">
            <button onClick={() => setSearchSection(false)}>Close Search</button>
        </div>
    )
}));

jest.mock('../index', () => ({
    DropdownLoggedIn: ({ setDropdown }) => (
        <div data-testid="dropdown-logged-in">
            <button onClick={() => setDropdown(false)}>Logout</button>
        </div>
    ),
    DropdownLoggedOut: ({ setDropdown }) => (
        <div data-testid="dropdown-logged-out">
            <button onClick={() => setDropdown(false)}>Close Dropdown</button>
        </div>
    )
}));

const renderHeader = () => {
    return render(
        <BrowserRouter>
            <Header />
        </BrowserRouter>
    );
};

describe('Header Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        sessionStorage.clear();
        localStorage.clear();
    });

    test('renders logo and CodeBook text', () => {
        renderHeader();
        expect(screen.getByAltText('CodeBook Logo')).toBeInTheDocument();
        expect(screen.getByText('CodeBook')).toBeInTheDocument();
    });

    test('displays cart item count', () => {
        renderHeader();
        expect(screen.getByText('2')).toBeInTheDocument();
    });

    test('toggles search section when search icon is clicked', () => {
        const { container } = renderHeader();
        const searchIcon = container.querySelector('.bi-search');

        fireEvent.click(searchIcon);
        expect(screen.getByTestId('search')).toBeInTheDocument();
    });

    test('toggles dropdown when person icon is clicked', () => {
        const { container } = renderHeader();
        const personIcon = container.querySelector('.bi-person-circle');

        fireEvent.click(personIcon);
        expect(screen.getByTestId('dropdown-logged-out')).toBeInTheDocument();
    });

    test('applies dark mode when toggle is clicked', async () => {
        const { container } = renderHeader();
        const darkModeIcon = container.querySelector('.bi-gear-wide-connected');
        fireEvent.click(darkModeIcon);

        await waitFor(() => {
            expect(document.documentElement.classList.contains('dark')).toBe(true);
        });
    });

    test('does not show welcome message when user is not logged in', () => {
        authService.getLoggedInUserDetails.mockResolvedValue({});
        renderHeader();
        expect(screen.queryByText(/Welcome/)).not.toBeInTheDocument();
    });

    test('fetches user details when token is present', async () => {
        const mockUser = { email: 'test@example.com' };
        authService.getLoggedInUserDetails.mockResolvedValue(mockUser);

        sessionStorage.setItem('token', JSON.stringify('fake-token'));

        renderHeader();

        await waitFor(() => {
            expect(authService.getLoggedInUserDetails).toHaveBeenCalled();
        });
    });

    test('renders cart link', () => {
        const { container } = renderHeader();
        const cartLink = container.querySelector('a[href="/cart"]');
        expect(cartLink).toBeInTheDocument();
        expect(cartLink).toHaveAttribute('href', '/cart');
    });

    test('renders logo link to home', () => {
        renderHeader();
        const logoLink = screen.getByRole('link', { name: /CodeBook/i });
        expect(logoLink).toHaveAttribute('href', '/');
    });
});
