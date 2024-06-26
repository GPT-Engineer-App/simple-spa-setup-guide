import { render, screen } from '@testing-library/react';
import CreateEditPost from '../pages/CreateEditPost.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SupabaseAuthProvider } from '../integrations/supabase/auth.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

describe('CreateEditPost Page', () => {
  test('renders create new post heading for Editor role', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/blog/new']}>
            <Routes>
              <Route path="/blog/new" element={<ProtectedRoute requiredRole="Editor"><CreateEditPost /></ProtectedRoute>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    const heading = screen.getByText(/Create New Post/i);
    expect(heading).toBeInTheDocument();
  });

  test('redirects to login if not Editor role', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/blog/new']}>
            <Routes>
              <Route path="/blog/new" element={<ProtectedRoute requiredRole="Editor"><CreateEditPost /></ProtectedRoute>} />
              <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});