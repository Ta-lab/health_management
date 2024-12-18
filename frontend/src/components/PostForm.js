import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createPost, editPost } from '../redux/postSlice';

const PostForm = ({ postId, onClose, refreshPosts }) => {
    const dispatch = useDispatch();
    const { posts } = useSelector((state) => state.posts);

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    useEffect(() => {
        if (postId) {
            const post = posts.find((p) => p._id === postId);
            if (post) {
                setTitle(post.title);
                setContent(post.content);
            }
        } else {
            setTitle('');
            setContent('');
        }
    }, [postId, posts]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const postData = { title, content };
        if (postId) {
            await dispatch(editPost(String(postId), postData));
        } else {
            await dispatch(createPost(postData));
        }

        refreshPosts();
        onClose();
    };

    return (
        <div className="modal show d-block" tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            {postId ? 'Edit Post' : 'Create Post'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Content</label>
                                <textarea
                                    className="form-control"
                                    value={content}
                                    onChange={(e) => setContent(e.target.value)}
                                    required
                                ></textarea>
                            </div>
                            <div className="d-flex justify-content-end">
                                <button
                                    type="button"
                                    className="btn btn-secondary me-2"
                                    onClick={onClose}
                                >
                                    Cancel
                                </button>
                                <button type="submit" className="btn btn-primary">
                                    {postId ? 'Update Post' : 'Create Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostForm;
