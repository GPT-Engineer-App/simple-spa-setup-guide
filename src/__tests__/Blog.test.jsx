import { render, screen, fireEvent } from '@testing-library/react';
import Blog from '../pages/Blog.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../store';

describe('Blog Page', () => {
  test('renders blog heading', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Blog />
        </ChakraProvider>
      </Provider>
    );
    const heading = screen.getByText(/Blog/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders create new post button', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Blog />
        </ChakraProvider>
      </Provider>
    );
    const button = screen.getByText(/Create New Post/i);
    expect(button).toBeInTheDocument();
  });

  test('renders posts', async () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <Blog />
        </ChakraProvider>
      </Provider>
    );
    const posts = await screen.findAllByText(/Post/i);
    expect(posts.length).toBeGreaterThan(0);
  });
});