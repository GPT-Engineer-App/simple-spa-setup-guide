import { Box, Flex, Link } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebaseConfig";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

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
            <Link as={NavLink} to="/blog" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
              Blog
            </Link>
            <Link as={NavLink} to="/dashboard" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
              Dashboard
            </Link>
            {user ? (
              <Link as={NavLink} to="/profile" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
                Profile
              </Link>
            ) : (
              <>
                <Link as={NavLink} to="/register" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
                  Register
                </Link>
                <Link as={NavLink} to="/login" px={2} py={1} rounded="md" _hover={{ textDecoration: 'none', bg: 'teal.600' }} _activeLink={{ bg: 'teal.700' }}>
                  Login
                </Link>
              </>
            )}
          </Box>
        </Flex>
      </Box>
    </motion.div>
  );
};

export default Navbar;