import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaRocket } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl">Welcome to Our SPA</Heading>
        <Text fontSize="xl">This is the initial setup of our Single Page Application.</Text>
        <Button rightIcon={<FaRocket />} colorScheme="teal" variant="solid" size="lg">
          Get Started
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;