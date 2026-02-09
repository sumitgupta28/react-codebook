import { render, screen } from '@testing-library/react';
import { StarRating } from './StarRating';

describe('StarRating Component', () => {
    test('renders full stars based on rating', () => {
        const { container } = render(<StarRating rating={3} />);
        const fullStars = container.querySelectorAll('.bi-star-fill');
        expect(fullStars).toHaveLength(3);
    });

    test('renders half star when rating has decimal', () => {
        const { container } = render(<StarRating rating={3.5} />);
        const halfStars = container.querySelectorAll('.bi-star-half');
        expect(halfStars.length).toBeGreaterThan(0);
    });

    test('renders empty stars for remaining rating', () => {
        const { container } = render(<StarRating rating={2} />);
        const emptyStars = container.querySelectorAll('.bi-star:not(.bi-star-fill):not(.bi-star-half)');
        expect(emptyStars.length).toBeGreaterThan(0);
    });

    test('renders 5 total stars', () => {
        const { container } = render(<StarRating rating={2.5} />);
        const allStars = container.querySelectorAll('[class*="bi-star"]');
        expect(allStars.length).toBe(5);
    });

    test('displays stars in yellow color', () => {
        const { container } = render(<StarRating rating={4} />);
        const stars = container.querySelectorAll('[class*="bi-star"]');
        stars.forEach(star => {
            expect(star.classList.contains('text-yellow-500')).toBe(true);
        });
    });
});
