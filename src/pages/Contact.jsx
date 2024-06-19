import { Container, Heading, Text } from "@chakra-ui/react";

const Contact = () => {
  return (
    <Container centerContent maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={4}>Contact Us</Heading>
      <Text fontSize="xl">This is the Contact page of our Single Page Application.</Text>
    </Container>
  );
};

export default Contact;