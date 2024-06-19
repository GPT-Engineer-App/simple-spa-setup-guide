import { render, screen } from '@testing-library/react';
import Index from '../pages/Index.jsx';
import { ChakraProvider } from '@chakra-ui/react';

describe('Index Page', () => {
  test('renders welcome message', () => {
    render(
      <ChakraProvider>
        <Index />
      </ChakraProvider>
    );
    const welcomeMessage = screen.getByText(/Welcome to Our SPA/i);
    expect(welcomeMessage).toBeInTheDocument();
  });

  test('renders get started button', () => {
    render(
      <ChakraProvider>
        <Index />
      </ChakraProvider>
    );
    const getStartedButton = screen.getByRole('button', { name: /Get Started/i });
    expect(getStartedButton).toBeInTheDocument();
  });
});