import { render, screen } from '@testing-library/react';
import Dashboard from '../pages/Dashboard.jsx';
import { ChakraProvider } from '@chakra-ui/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SupabaseAuthProvider } from '../integrations/supabase/auth.jsx';
import ProtectedRoute from '../components/ProtectedRoute.jsx';

describe('Dashboard Page', () => {
  test('renders dashboard heading for Admin role', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute requiredRole="Admin"><Dashboard /></ProtectedRoute>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    const heading = screen.getByText(/Dashboard/i);
    expect(heading).toBeInTheDocument();
  });

  test('redirects to login if not Admin role', () => {
    render(
      <ChakraProvider>
        <SupabaseAuthProvider>
          <MemoryRouter initialEntries={['/dashboard']}>
            <Routes>
              <Route path="/dashboard" element={<ProtectedRoute requiredRole="Admin"><Dashboard /></ProtectedRoute>} />
              <Route path="/login" element={<div>Login Page</div>} />
            </Routes>
          </MemoryRouter>
        </SupabaseAuthProvider>
      </ChakraProvider>
    );
    expect(screen.getByText(/Login Page/i)).toBeInTheDocument();
  });
});