import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../components/ProtectedRoute.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SupabaseAuthProvider } from '../integrations/supabase/auth.jsx';

const MockComponent = () => <div>Mock Component</div>;

describe('ProtectedRoute Component', () => {
  test('renders loading state', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/protected']}>
            <Routes>
              <Route path="/protected" element={<ProtectedRoute><MockComponent /></ProtectedRoute>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test('redirects to login if not authenticated', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/protected']}>
            <Routes>
              <Route path="/protected" element={<ProtectedRoute><MockComponent /></ProtectedRoute>} />
              <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });

  test('renders component if authenticated and role matches', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/protected']}>
            <Routes>
              <Route path="/protected" element={<ProtectedRoute requiredRole="Admin"><MockComponent /></ProtectedRoute>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    expect(screen.getByText(/Mock Component/i)).toBeInTheDocument();
  });
});