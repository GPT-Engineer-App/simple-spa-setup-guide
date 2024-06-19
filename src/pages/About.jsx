import { Container, Heading, Text } from "@chakra-ui/react";

const About = () => {
  return (
    <Container centerContent maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={4}>About Us</Heading>
      <Text fontSize="xl">This is the About page of our Single Page Application.</Text>
    </Container>
  );
};

export default About;