import { render, screen, fireEvent } from '@testing-library/react';
import CreateEditPost from '../pages/CreateEditPost.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import store from '../store';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

describe('CreateEditPost Page', () => {
  test('renders create new post heading', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter initialEntries={['/blog/new']}>
            <Routes>
              <Route path="/blog/new" element={<CreateEditPost />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </Provider>
    );
    const heading = screen.getByText(/Create New Post/i);
    expect(heading).toBeInTheDocument();
  });

  test('renders edit post heading', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter initialEntries={['/blog/edit/1']}>
            <Routes>
              <Route path="/blog/edit/:id" element={<CreateEditPost />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </Provider>
    );
    const heading = screen.getByText(/Edit Post/i);
    expect(heading).toBeInTheDocument();
  });

  test('submits form successfully', () => {
    render(
      <Provider store={store}>
        <ChakraProvider>
          <MemoryRouter initialEntries={['/blog/new']}>
            <Routes>
              <Route path="/blog/new" element={<CreateEditPost />} />
            </Routes>
          </MemoryRouter>
        </ChakraProvider>
      </Provider>
    );

    const titleInput = screen.getByLabelText(/Title/i);
    const contentInput = screen.getByLabelText(/Content/i);
    const submitButton = screen.getByRole('button', { name: /Create Post/i });

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });

    fireEvent.click(submitButton);

    const successMessage = screen.getByText(/Your post has been created successfully./i);
    expect(successMessage).toBeInTheDocument();
  });
});