// components/Post.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../client';
import Comments from './Comments';
import './styles/Post.css';

const Post = ({ post, isFullPost = false }) => {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);

  const handleUpvote = async (e) => {
    e.stopPropagation(); // Prevent post click event
    try {
      const { data, error } = await supabase
        .from('Posts')
        .update({ upvotes: upvotes + 1 })
        .eq('id', post.id)
        .select();

      if (error) throw error;
      setUpvotes(upvotes + 1);
    } catch (error) {
      console.error('Error upvoting:', error);
    }
  };

  const handleDelete = async () => {
    try {
        // First delete all comments associated with the post
        const { error: commentsError } = await supabase
            .from('Comments')
            .delete()
            .eq('post_id', post.id);

        if (commentsError) throw commentsError;

        // Then delete the post
        const { error: postError } = await supabase
            .from('Posts')
            .delete()
            .eq('id', post.id);

        if (postError) throw postError;
        
        navigate('/forum');
    } catch (error) {
        console.error('Error deleting post:', error);
    }
};

  const handleClick = () => {
    if (!isFullPost) {
      navigate(`/post/${post.id}`);
    }
  };

  return (
    <div className={`Post ${isFullPost ? 'full-post' : ''}`} onClick={handleClick}>
      <div className="top">
        <h1>{post.title}</h1>
        <h4>Created By: {post.username}</h4>
      </div>
      <div className="post-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span>👍 {upvotes}</span>
      </div>
      
      {isFullPost && (
        <>
          {post.content && <p className="content">{post.content}</p>}
          {post.img_url && (
            <div className="image-container">
              <img 
                src={post.img_url} 
                alt={post.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://placehold.co/600x400?text=Image+Not+Found';
                }}
              />
            </div>
          )}
          <div className="post-actions">
            <button onClick={handleUpvote}>Upvote</button>
            <button onClick={(e) => {
              e.stopPropagation();
              navigate(`/edit/${post.id}`);
            }}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <Comments postId={post.id} />
        </>
      )}
    </div>
  );
};

export default Post;