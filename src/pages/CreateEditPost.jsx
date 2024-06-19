import { useState, useEffect } from "react";
import { Container, Heading, FormControl, FormLabel, Input, Textarea, Button, useToast, Spinner, Alert, AlertIcon } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useAddBlogPost, useUpdateBlogPost, useBlogPost } from "../integrations/supabase/index.js";

const CreateEditPost = () => {
  const { id } = useParams();
  const addBlogPost = useAddBlogPost();
  const updateBlogPost = useUpdateBlogPost();
  const { data: post, error, isLoading } = useBlogPost(id);
  const navigate = useNavigate();
  const toast = useToast();
  const post = useSelector((state) => state.posts.currentPost);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateBlogPost.mutate({ id, title, content }, {
        onSuccess: () => {
          toast({
            title: "Post updated.",
            description: "Your post has been updated successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/blog");
        },
      });
    } else {
      addBlogPost.mutate({ title, content }, {
        onSuccess: () => {
          toast({
            title: "Post created.",
            description: "Your post has been created successfully.",
            status: "success",
            duration: 5000,
            isClosable: true,
          });
          navigate("/blog");
        },
      });
    }
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
      <Heading as="h1" size="2xl" mb={4}>{id ? "Edit Post" : "Create New Post"}</Heading>
      <form onSubmit={handleSubmit}>
        <FormControl id="title" isRequired mb={4}>
          <FormLabel>Title</FormLabel>
          <Input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </FormControl>
        <FormControl id="content" isRequired mb={4}>
          <FormLabel>Content</FormLabel>
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} />
        </FormControl>
        <Button type="submit" colorScheme="teal" size="lg" mt={4}>{id ? "Update Post" : "Create Post"}</Button>
      </form>
    </Container>
  );
};

export default CreateEditPost;