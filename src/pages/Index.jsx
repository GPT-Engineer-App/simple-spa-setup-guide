import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { FaRocket } from "react-icons/fa";

const Index = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}>
      <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" bg="gray.50" p={10}>
        <VStack spacing={4} border="1px" borderColor="gray.200" boxShadow="md" p={6} borderRadius="md">
          <Heading as="h1" size="2xl">Welcome to Our SPA</Heading>
          <Text fontSize="xl">This is the initial setup of our Single Page Application.</Text>
          <Button rightIcon={<FaRocket />} bgGradient="linear(to-r, teal.400, teal.500)" color="white" variant="solid" size="lg" _hover={{ bgGradient: "linear(to-r, teal.500, teal.600)" }}>
            Get Started
          </Button>
        </VStack>
      </Container>
    </motion.div>
  );
};

export default Index;