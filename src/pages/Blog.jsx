import { useState, useEffect } from "react";
import { Container, Heading, Button, VStack, Box, Text, HStack, IconButton } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "../store/postsSlice";

const Blog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={4}>Blog</Heading>
      <Button colorScheme="teal" mb={4} onClick={() => navigate("/blog/new")}>Create New Post</Button>
      <VStack spacing={4} w="100%">
        {posts.map((post) => (
          <Box key={post.id} p={5} shadow="md" borderWidth="1px" w="100%">
            <HStack justifyContent="space-between">
              <Heading fontSize="xl">{post.title}</Heading>
              <HStack>
                <IconButton icon={<FaEdit />} onClick={() => navigate(`/blog/edit/${post.id}`)} />
                <IconButton icon={<FaTrash />} onClick={() => handleDelete(post.id)} />
              </HStack>
            </HStack>
            <Text mt={4}>{post.content}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default Blog;