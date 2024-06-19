import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

// Fetch posts from the API

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await axios.get(API_URL);
  return response.data;
});

export const fetchPostById = createAsyncThunk('posts/fetchPostById', async (id) => {
  // Fetch a single post by ID from the API
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
});

export const createPost = createAsyncThunk('posts/createPost', async (post) => {
  // Create a new post using the API
  const response = await axios.post(API_URL, post);
  return response.data;
});

export const updatePost = createAsyncThunk('posts/updatePost', async ({ id, title, content }) => {
  // Update an existing post using the API
  const response = await axios.put(`${API_URL}/${id}`, { title, content });
  return response.data;
});

export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  // Delete a post using the API
  await axios.delete(`${API_URL}/${id}`);
  return id;
});

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    items: [],
    currentPost: null,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchPostById.fulfilled, (state, action) => {
        state.currentPost = action.payload;
      })
      .addCase(createPost.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const index = state.items.findIndex((post) => post.id === action.payload.id);
        state.items[index] = action.payload;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((post) => post.id !== action.payload);
      });
  },
});

export default postsSlice.reducer;