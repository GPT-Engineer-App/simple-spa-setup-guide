import { useState, useEffect } from "react";
import { Container, Heading, FormControl, FormLabel, Input, Textarea, Button, useToast } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost, fetchPostById } from "../store/postsSlice";

const CreateEditPost = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const post = useSelector((state) => state.posts.currentPost);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchPostById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      dispatch(updatePost({ id, title, content }));
      toast({
        title: "Post updated.",
        description: "Your post has been updated successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } else {
      dispatch(createPost({ title, content }));
      toast({
        title: "Post created.",
        description: "Your post has been created successfully.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    }
    navigate("/blog");
  };

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