import { useState } from "react";
import { Container, Heading, FormControl, FormLabel, Input, Button, useToast, FormErrorMessage } from "@chakra-ui/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useToast();
  const navigate = useNavigate();

  const validateForm = () => {
    let formErrors = {};
    if (!email) formErrors.email = "Email is required";
    if (!password) formErrors.password = "Password is required";
    if (password !== confirmPassword) formErrors.confirmPassword = "Passwords do not match";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast({
          title: "Registration successful.",
          description: "You have registered successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/login");
      } catch (error) {
        toast({
          title: "Registration failed.",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      toast({
        title: "Form submission failed.",
        description: "Please correct the errors and try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
      <Heading as="h1" size="2xl" mb={4}>Register</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="email" isRequired mb={4} isInvalid={errors.email}>
          <FormLabel>Email</FormLabel>
          <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
        </FormControl>
        <FormControl id="password" isRequired mb={4} isInvalid={errors.password}>
          <FormLabel>Password</FormLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          {errors.password && <FormErrorMessage>{errors.password}</FormErrorMessage>}
        </FormControl>
        <FormControl id="confirmPassword" isRequired mb={4} isInvalid={errors.confirmPassword}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {errors.confirmPassword && <FormErrorMessage>{errors.confirmPassword}</FormErrorMessage>}
        </FormControl>
        <Button type="submit" colorScheme="teal" size="lg" mt={4}>Register</Button>
      </form>
    </Container>
  );
};

export default Register;