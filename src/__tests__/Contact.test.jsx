import { render, screen, fireEvent } from '@testing-library/react';
import Contact from '../pages/Contact.jsx';
import { ChakraProvider } from '@chakra-ui/react';

describe('Contact Page', () => {
  test('renders contact us heading', () => {
    render(
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    );
    const heading = screen.getByText(/Contact Us/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders contact page description', () => {
    render(
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    );
    const description = screen.getByText(/This is the Contact page of our Single Page Application./i);
    expect(description).toBeInTheDocument();
  });

  test('validates form fields', () => {
    render(
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    );

    const submitButton = screen.getByRole('button', { name: /Submit/i });
    fireEvent.click(submitButton);

    const nameError = screen.getByText(/Name is required/i);
    const emailError = screen.getByText(/Email is required/i);
    const messageError = screen.getByText(/Message is required/i);

    expect(nameError).toBeInTheDocument();
    expect(emailError).toBeInTheDocument();
    expect(messageError).toBeInTheDocument();
  });

  test('submits form successfully', () => {
    render(
      <ChakraProvider>
        <Contact />
      </ChakraProvider>
    );

    const nameInput = screen.getByLabelText(/Name/i);
    const emailInput = screen.getByLabelText(/Email/i);
    const messageInput = screen.getByLabelText(/Message/i);
    const submitButton = screen.getByRole('button', { name: /Submit/i });

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(messageInput, { target: { value: 'Hello, this is a test message.' } });

    fireEvent.click(submitButton);

    const successMessage = screen.getByText(/We've received your message./i);
    expect(successMessage).toBeInTheDocument();
  });
});