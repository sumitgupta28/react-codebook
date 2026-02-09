# Jest Unit Tests - CodeBook Project

## Overview
This project includes comprehensive unit tests using Jest and React Testing Library. Tests cover components, services, reducers, and hooks.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm test -- --watch
```

### Run tests with coverage
```bash
npm test -- --coverage
```

### Run specific test file
```bash
npm test -- Header.test.js
```

### Run tests matching a pattern
```bash
npm test -- --testNamePattern="renders"
```

## Test Files

### Components
- **Header.test.js** - Tests for Header component including:
  - Logo and branding rendering
  - Dark mode toggle
  - Search section toggle
  - User authentication status
  - Cart display

- **ProductCard.test.js** - Tests for ProductCard component including:
  - Product image and details display
  - Best seller badge
  - Stock status
  - Add to cart functionality
  - Pricing display

- **StarRating.test.js** - Tests for StarRating component including:
  - Full star rendering
  - Half star rendering
  - Empty star rendering
  - Color validation

### Services
- **authService.test.js** - Tests for authentication service including:
  - User login functionality
  - Token storage
  - User registration
  - Logout functionality

### Reducers
- **cartReducers.test.js** - Tests for cart reducer including:
  - Adding items to cart
  - Removing items from cart
  - Clearing cart
  - Duplicate prevention

- **filterReducers.test.js** - Tests for filter reducer including:
  - Product list updates
  - Filter toggling
  - Sort options
  - Rating filters
  - Filter clearing

## Test Structure

Each test file follows this pattern:
```javascript
describe('Component/Service Name', () => {
    beforeEach(() => {
        // Setup before each test
    });

    test('should do something specific', () => {
        // Arrange
        // Act
        // Assert
    });
});
```

## Mocking

The tests use Jest mocks for:
- API services
- Context hooks
- External dependencies
- DOM APIs

## Coverage

To view coverage reports:
```bash
npm test -- --coverage --watchAll=false
```

This generates a coverage report showing:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Writing New Tests

When adding new components or features:

1. Create a `.test.js` file next to the component
2. Import the component and required testing utilities
3. Mock external dependencies
4. Write test cases following AAA pattern (Arrange, Act, Assert)
5. Run tests to ensure they pass

Example:
```javascript
import { render, screen } from '@testing-library/react';
import { MyComponent } from './MyComponent';

describe('MyComponent', () => {
    test('renders correctly', () => {
        render(<MyComponent />);
        expect(screen.getByText('Expected text')).toBeInTheDocument();
    });
});
```

## Best Practices

1. **Test user behavior**, not implementation details
2. **Use descriptive test names** that explain what is being tested
3. **Keep tests focused** - one concept per test
4. **Mock external dependencies** to isolate the code being tested
5. **Use meaningful assertions** that clearly communicate intent
6. **Maintain test independence** - tests should not depend on each other

## Debugging Tests

### Run a single test
```bash
npm test -- --testNamePattern="specific test name"
```

### Debug in browser
Add `debugger;` statement and run:
```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

### View debug output
```bash
npm test -- --verbose
```

## Troubleshooting

### Common Issues

**Tests timing out**
- Increase timeout: `jest.setTimeout(10000);`
- Check for unresolved promises

**Module not found**
- Verify import paths
- Check jest moduleNameMapper in package.json

**Mocks not working**
- Ensure mocks are defined before imports
- Clear mocks between tests: `jest.clearAllMocks();`

**Async issues**
- Use `async/await` or `.then()`
- Wrap async operations in `waitFor()`

