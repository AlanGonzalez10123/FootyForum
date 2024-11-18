// components/Comments.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import './styles/Comments.css';

const Comments = ({ postId }) => {
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState({
        content: '',
        username: ''
    });

    useEffect(() => {
        fetchComments();
    }, [postId]);

    const fetchComments = async () => {
        try {
            const { data, error } = await supabase
                .from('Comments')
                .select('*')
                .eq('post_id', postId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setComments(data || []);
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.content.trim() || !newComment.username.trim()) return;

        try {
            const { error } = await supabase
                .from('Comments')
                .insert([
                    {
                        content: newComment.content,
                        username: newComment.username,
                        post_id: postId
                    }
                ]);

            if (error) throw error;

            // Clear the form and refresh comments
            setNewComment({ content: '', username: '' });
            fetchComments();
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Error adding comment. Please try again.');
        }
    };

    return (
        <div className="comments-section">
            <h3>Comments</h3>
            
            <form onSubmit={handleSubmit} className="comment-form">
                <input
                    type="text"
                    placeholder="Your Username"
                    value={newComment.username}
                    onChange={(e) => setNewComment({
                        ...newComment,
                        username: e.target.value
                    })}
                    required
                />
                <textarea
                    placeholder="Write a comment..."
                    value={newComment.content}
                    onChange={(e) => setNewComment({
                        ...newComment,
                        content: e.target.value
                    })}
                    required
                />
                <button type="submit">Post Comment</button>
            </form>

            <div className="comments-list">
                {comments.map((comment) => (
                    <div key={comment.id} className="comment">
                        <div className="comment-header">
                            <span className="username">{comment.username}</span>
                            <span className="date">
                                {new Date(comment.created_at).toLocaleString()}
                            </span>
                        </div>
                        <p className="comment-content">{comment.content}</p>
                    </div>
                ))}
                
                {comments.length === 0 && (
                    <p className="no-comments">No comments yet. Be the first to comment!</p>
                )}
            </div>
        </div>
    );
};

export default Comments;