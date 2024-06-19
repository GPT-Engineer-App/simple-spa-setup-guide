import { useState, useEffect } from "react";
import { useSocket } from '../integrations/socket';
import { Container, Heading, Button, VStack, Box, Text, HStack, IconButton, Spinner, Alert, AlertIcon, useToast } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useBlogPosts, useDeleteBlogPost } from "../integrations/supabase/index.js";

const Blog = () => {
  const navigate = useNavigate();
  const { data: posts, error, isLoading, refetch } = useBlogPosts();
  const socket = useSocket();
  const deleteBlogPost = useDeleteBlogPost();
  const toast = useToast();

  useEffect(() => {
    if (socket) {
      socket.on('blogPostUpdated', () => {
        refetch();
        toast({
          title: "Blog Post Updated",
          description: "A blog post has been updated.",
          status: "info",
          duration: 5000,
          isClosable: true,
        });
      });

      socket.on('blogPostDeleted', () => {
        refetch();
        toast({
          title: "Blog Post Deleted",
          description: "A blog post has been deleted.",
          status: "warning",
          duration: 5000,
          isClosable: true,
        });
      });

      socket.on('blogPostCreated', () => {
        refetch();
        toast({
          title: "Blog Post Created",
          description: "A new blog post has been created.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      });
    }

    return () => {
      if (socket) {
        socket.off('blogPostUpdated');
        socket.off('blogPostDeleted');
        socket.off('blogPostCreated');
      }
    };
  }, [socket, refetch, toast]);

  const handleDelete = (id) => {
    deleteBlogPost.mutate(id, {
      onSuccess: () => {
        toast({
          title: "Blog Post Deleted",
          description: "The blog post has been deleted successfully.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      },
      onError: (error) => {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    });
  };

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return (
      <Alert status="error">
        <AlertIcon />
        {error.message}
      </Alert>
    );
  }

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