import { useState } from "react";
import { Container, Heading, Text, FormControl, FormLabel, Input, Textarea, Button, useToast } from "@chakra-ui/react";
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();
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
  };

  return (
    <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
      <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
        <Heading as="h1" size="2xl" mb={4} border="1px" borderColor="gray.200" boxShadow="sm" p={4} borderRadius="md">Contact Us</Heading>
        <Text fontSize="xl" color="gray.700" mb={6}>This is the Contact page of our Single Page Application.</Text>
        <form onSubmit={handleSubmit}>
          <FormControl id="name" isRequired mb={4}>
            <FormLabel>Name</FormLabel>
            <Input type="text" value={name} onChange={(e) => setName(e.target.value)} />
          </FormControl>
          <FormControl id="email" isRequired mb={4}>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </FormControl>
          <FormControl id="message" isRequired mb={4}>
            <FormLabel>Message</FormLabel>
            <Textarea value={message} onChange={(e) => setMessage(e.target.value)} />
          </FormControl>
          <Button type="submit" colorScheme="teal" size="lg" mt={4}>Submit</Button>
        </form>
      </Container>
    </motion.div>
  );
};

export default Contact;