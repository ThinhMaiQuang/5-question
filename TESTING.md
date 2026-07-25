# Testing Guide

This project uses **Vitest** and **React Testing Library** for testing.

## Running Tests

```bash
# Run tests once
npm test

# Run tests in watch mode (interactive)
npm run test

# Run tests with UI interface
npm run test:ui

# Run tests once (CI mode)
npm run test:run

# Run tests with coverage report
npm run test:coverage
```

## Test Structure

### Component Tests

- **Option.test.tsx** - Tests for the Option component
  - Rendering labels
  - Click handling
  - Status styling (normal, correct, incorrect)

- **Question.test.tsx** - Tests for the Question component
  - Question text rendering
  - Answer options rendering
  - Option selection handling
  - View mode with correct/incorrect styling

- **App.test.tsx** - Tests for the main App component
  - Basic rendering
  - Redux Provider integration

### Hook Tests

- **useFetch.test.ts** - Tests for the custom useFetch hook
  - Initial state
  - Successful data fetching
  - Error handling
  - Manual fetch with callback
  - URL updates and refetching
  - Manual data updates

### Store Tests

- **store.test.ts** - Tests for the Redux store
  - Initial state
  - Adding answers
  - Updating existing answers
  - Multiple questions handling
  - Reset functionality
  - Property preservation

## Test Coverage

Run `npm run test:coverage` to see detailed coverage reports.

## Writing New Tests

Tests are located in the `src/test/` directory. Follow the existing patterns:

1. Import necessary testing utilities
2. Mock external dependencies if needed
3. Use descriptive test names
4. Test one behavior per test case
5. Use React Testing Library queries and assertions
