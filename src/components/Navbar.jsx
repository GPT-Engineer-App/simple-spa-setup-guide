import { Box, Flex, Link, Button } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <motion.div initial={{ y: -50 }} animate={{ y: 0 }} transition={{ type: "spring", stiffness: 100 }}>
      <Box bgGradient="linear(to-r, teal.500, teal.600)" px={4}>
        <Flex h={16} alignItems="center" justifyContent="space-between" boxShadow="md">
          <Box>
            <Link as={NavLink} to="/" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
              Home
            </Link>
            <Link as={NavLink} to="/about" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
              About
            </Link>
            <Link as={NavLink} to="/contact" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
              Contact
            </Link>
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Navbar;