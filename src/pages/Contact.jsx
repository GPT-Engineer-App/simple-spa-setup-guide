import { Container, Heading, Text } from "@chakra-ui/react";

const Contact = () => {
  return (
    <Container centerContent maxW="container.md" py={10} bg="gray.50" p={10} borderRadius="md" boxShadow="md">
      <Heading as="h1" size="2xl" mb={4} border="1px" borderColor="gray.200" boxShadow="sm" p={4} borderRadius="md">Contact Us</Heading>
      <Text fontSize="xl" color="gray.700">This is the Contact page of our Single Page Application.</Text>
    </Container>
  );
};

export default Contact;