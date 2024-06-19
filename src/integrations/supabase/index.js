import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/* supabase integration types

### event

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| name       | text        | string | true     |
| created_at | timestamptz | string | true     |
| date       | date        | string | true     |

### user

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | uuid        | string | true     |
| email      | text        | string | true     |
| created_at | timestamptz | string | true     |

### blog_post

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| title      | text        | string | true     |
| content    | text        | string | true     |
| created_at | timestamptz | string | true     |
| user_id    | uuid        | string | true     |

*/

// Hooks for event table

export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('event').select('*')),
});

export const useEvent = (id) => useQuery({
    queryKey: ['event', id],
    queryFn: () => fromSupabase(supabase.from('event').select('*').eq('id', id).single()),
});

export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('event').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

export const useUpdateEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedEvent) => fromSupabase(supabase.from('event').update(updatedEvent).eq('id', updatedEvent.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
            queryClient.invalidateQueries(['event', updatedEvent.id]);
        },
    });
};

export const useDeleteEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('event').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

// Hooks for user table

export const useUsers = () => useQuery({
    queryKey: ['users'],
    queryFn: () => fromSupabase(supabase.from('user').select('*')),
});

export const useUser = (id) => useQuery({
    queryKey: ['user', id],
    queryFn: () => fromSupabase(supabase.from('user').select('*').eq('id', id).single()),
});

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('user').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUser) => fromSupabase(supabase.from('user').update(updatedUser).eq('id', updatedUser.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
            queryClient.invalidateQueries(['user', updatedUser.id]);
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('user').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

// Hooks for blog_post table

export const useBlogPosts = () => useQuery({
    queryKey: ['blog_posts'],
    queryFn: () => fromSupabase(supabase.from('blog_post').select('*')),
});

export const useBlogPost = (id) => useQuery({
    queryKey: ['blog_post', id],
    queryFn: () => fromSupabase(supabase.from('blog_post').select('*').eq('id', id).single()),
});

export const useAddBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newBlogPost) => fromSupabase(supabase.from('blog_post').insert([newBlogPost])),
        onSuccess: () => {
            queryClient.invalidateQueries('blog_posts');
        },
    });
};

export const useUpdateBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedBlogPost) => fromSupabase(supabase.from('blog_post').update(updatedBlogPost).eq('id', updatedBlogPost.id)),
        onSuccess: () => {
            queryClient.invalidateQueries('blog_posts');
            queryClient.invalidateQueries(['blog_post', updatedBlogPost.id]);
        },
    });
};

export const useDeleteBlogPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('blog_post').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('blog_posts');
        },
    });
};