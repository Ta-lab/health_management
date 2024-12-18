import { createSlice } from '@reduxjs/toolkit';
import { apiGet, apiPost, apiPut, apiDelete } from '../services/api';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        addPost: (state, action) => {
            state.posts.push(action.payload);
        },
        updatePost: (state, action) => {
            const index = state.posts.findIndex((post) => post._id === action.payload._id);
            if (index !== -1) {
                state.posts[index] = action.payload;
            }
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        setLoading: (state, action) => {
            state.loading = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setPosts,
    addPost,
    updatePost,
    deletePost,
    setLoading,
    setError,
} = postSlice.actions;

export const fetchPosts = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await apiGet('/posts');
        dispatch(setPosts(response.data));
    } catch (error) {
        dispatch(setError('Failed to fetch posts.'));
    } finally {
        dispatch(setLoading(false));
    }
};

export const createPost = (postData) => async (dispatch) => {
    try {
        const response = await apiPost('/posts', postData);
        dispatch(addPost(response.data));
    } catch (error) {
        dispatch(setError('Failed to create post.'));
    }
};

export const editPost = (postId, postData) => async (dispatch) => {
    try {
        console.log("slice", postData)
        console.log("slice", postId)
        const response = await apiPut(`/posts/${postId}`, postData);
        dispatch(updatePost(response.data));
    } catch (error) {
        dispatch(setError('Failed to update post.'));
    }
};

export const removePost = (postId) => async (dispatch) => {
    try {
        await apiDelete(`/posts/${postId}`);
        dispatch(deletePost(postId));
    } catch (error) {
        dispatch(setError('Failed to delete post.'));
    }
};

export default postSlice.reducer;
