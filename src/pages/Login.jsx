import { useState } from "react";
import { Container, Heading, FormControl, FormLabel, Input, Button, useToast, FormErrorMessage, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useSupabaseAuth, SupabaseAuthUI } from "../integrations/supabase/auth.jsx";

const Login = () => {
  const { session, loading } = useSupabaseAuth();
  const navigate = useNavigate();
  const toast = useToast();

  if (loading) {
    return <Spinner />;
  }

  if (session) {
    navigate("/");
    return null;
  }

  return (
    <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
      <Heading as="h1" size="2xl" mb={4}>Login</Heading>
      <SupabaseAuthUI />
    </Container>
  );
};

export default Login;