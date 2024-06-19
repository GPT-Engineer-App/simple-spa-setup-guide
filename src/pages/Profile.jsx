import { useState, useEffect } from "react";
import { Container, Heading, Text, Button, useToast, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useSupabaseAuth } from "../integrations/supabase/auth.jsx";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const { session, loading, logout } = useSupabaseAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Logout successful.",
        description: "You have logged out successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/login");
    } catch (error) {
      toast({
        title: "Logout failed.",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (loading) {
    return <Spinner />;
  }

  if (!session) {
    return (
      <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="2xl" mb={4}>Profile</Heading>
        <Text fontSize="xl" color="gray.700">You are not logged in.</Text>
        <Button colorScheme="teal" size="lg" mt={4} onClick={() => navigate("/login")}>Login</Button>
      </Container>
    );
  }

  return (
    <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
      <Heading as="h1" size="2xl" mb={4}>Profile</Heading>
      <Text fontSize="xl" color="gray.700">Welcome, {session.user.email}</Text>
      <Button colorScheme="teal" size="lg" mt={4} onClick={handleLogout}>Logout</Button>
    </Container>
  );
};

export default Profile;