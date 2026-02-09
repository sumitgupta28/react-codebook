import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import * as cartContext from '../../context';

jest.mock('../../context', () => ({
    useCart: jest.fn()
}));

const mockProduct = {
    id: 1,
    name: 'Test Book',
    poster: 'https://example.com/book.jpg',
    price: 29.99,
    in_stock: true,
    best_seller: false,
    rating: 4.5
};

const renderProductCard = (product = mockProduct) => {
    cartContext.useCart.mockReturnValue({
        cartList: [],
        addToCart: jest.fn(),
        removeFromCart: jest.fn()
    });

    return render(
        <BrowserRouter>
            <ProductCard product={product} />
        </BrowserRouter>
    );
};

describe('ProductCard Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders product image', () => {
        renderProductCard();
        const image = screen.getByAltText('Test Book');
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', 'https://example.com/book.jpg');
    });

    test('renders product name', () => {
        renderProductCard();
        expect(screen.getByText('Test Book')).toBeInTheDocument();
    });

    test('renders product price', () => {
        renderProductCard();
        expect(screen.getByText('$')).toBeInTheDocument();
        expect(screen.getByText('29.99')).toBeInTheDocument();
    });

    test('renders best seller badge when product is best seller', () => {
        const bestSellerProduct = { ...mockProduct, best_seller: true };
        renderProductCard(bestSellerProduct);
        expect(screen.getByText('Best Seller')).toBeInTheDocument();
    });

    test('renders in stock status when product is in stock', () => {
        renderProductCard();
        expect(screen.getByText('In Stock')).toBeInTheDocument();
    });

    test('renders out of stock status when product is out of stock', () => {
        const outOfStockProduct = { ...mockProduct, in_stock: false };
        renderProductCard(outOfStockProduct);
        expect(screen.getByText('Not In Stock')).toBeInTheDocument();
    });

    test('renders Add To Cart button when product not in cart', () => {
        renderProductCard();
        expect(screen.getByText(/Add To Cart/i)).toBeInTheDocument();
    });

    test('renders product link', () => {
        renderProductCard();
        const links = screen.getAllByRole('link');
        expect(links.some(link => link.getAttribute('href') === '/products/1')).toBe(true);
    });

    test('disables Add To Cart button when product is out of stock', () => {
        const outOfStockProduct = { ...mockProduct, in_stock: false };
        renderProductCard(outOfStockProduct);
        const addButton = screen.getByRole('button', { name: /Add To Cart/i });
        expect(addButton).toBeDisabled();
    });
});
