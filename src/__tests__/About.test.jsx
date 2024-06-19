import { render, screen } from '@testing-library/react';
import About from '../pages/About.jsx';
import { ChakraProvider } from '@chakra-ui/react';

describe('About Page', () => {
  test('renders about us heading', () => {
    render(
      <ChakraProvider>
        <About />
      </ChakraProvider>
    );
    const heading = screen.getByText(/About Us/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders about page description', () => {
    render(
      <ChakraProvider>
        <About />
      </ChakraProvider>
    );
    const description = screen.getByText(/This is the About page of our Single Page Application./i);
    expect(description).toBeInTheDocument();
  });
});