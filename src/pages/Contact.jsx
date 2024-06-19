import { useState } from "react";
import { Container, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, useToast, FormErrorMessage } from "@chakra-ui/react";
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const toast = useToast();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateForm = () => {
    let formErrors = {};
    if (!name) formErrors.name = "Name is required";
    if (!email) {
      formErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      formErrors.email = "Invalid email address";
    }
    if (!message) formErrors.message = "Message is required";
    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle form submission logic here
      toast({
        title: "Form submitted.",
        description: "We've received your message.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      // Clear form fields
      setName("");
      setEmail("");
      setMessage("");
      setErrors({});
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
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="2xl" mb={4} border="1px" borderColor="gray.200" boxShadow="sm" p={4} borderRadius="md">Contact Us</Heading>
        <Text fontSize="xl" color="gray.700" mb={6}>This is the Contact page of our Single Page Application.</Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4} isInvalid={errors.name}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            {errors.name && <FormErrorMessage>{errors.name}</FormErrorMessage>}
          </FormControl>
          <FormControl id="email" isRequired mb={4} isInvalid={errors.email}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors.email && <FormErrorMessage>{errors.email}</FormErrorMessage>}
          </FormControl>
          <FormControl id="message" isRequired mb={4} isInvalid={errors.message}>
            <FormLabel>Message</FormLabel>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
            {errors.message && <FormErrorMessage>{errors.message}</FormErrorMessage>}
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" mt={4}>Submit</Button>
        </form>
      </Container>
    </motion.div>
  );
};

export default Contact;