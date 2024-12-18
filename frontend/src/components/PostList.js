import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, removePost } from '../redux/postSlice';
import PostForm from './PostForm';

const PostList = () => {
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.posts);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editPostId, setEditPostId] = useState(null);

    useEffect(() => {
        dispatch(fetchPosts());
    }, [dispatch]);

    const refreshPosts = () => {
        dispatch(fetchPosts());
    };

    const openModal = (postId = null) => {
        setEditPostId(postId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setEditPostId(null);
        setIsModalOpen(false);
    };

    const handleDelete = (postId) => {
        dispatch(removePost(postId)).then(() => {
            refreshPosts();
        });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Posts</h2>

            <button
                className="btn btn-primary mb-4"
                onClick={() => openModal()}
            >
                Create Post
            </button>

            {loading && (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {error && (
                <div className="alert alert-danger text-center" role="alert">
                    Error: {error}
                </div>
            )}

            {!loading && !error && posts.length > 0 ? (
                <div className="row">
                    {posts.map((post) => (
                        <div key={post._id} className="col-md-6 col-lg-4 mb-4">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text">{post.content}</p>
                                    <div className="d-flex justify-content-between">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            onClick={() => openModal(post._id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm"
                                            onClick={() => handleDelete(post._id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center">
                    <p className="text-muted">No posts available</p>
                </div>
            )}

            {isModalOpen && (
                <PostForm
                    postId={editPostId}
                    onClose={closeModal}
                    refreshPosts={refreshPosts}
                />
            )}
        </div>
    );
};

export default PostList;
