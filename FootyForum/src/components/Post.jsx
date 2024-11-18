// components/Post.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { supabase } from '../client';
import Comments from './Comments';
import './styles/Post.css';

const Post = ({ post, isFullPost = false }) => {
  const navigate = useNavigate();
  const [upvotes, setUpvotes] = useState(post?.upvotes || 0);

  const handleUpvote = async () => {
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
      const { error } = await supabase
        .from('Posts')
        .delete()
        .eq('id', post.id);

      if (error) throw error;
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
        <h3>{post.username}</h3>
      </div>
      <div className="post-meta">
        <span>{new Date(post.created_at).toLocaleString()}</span>
        <span>👍 {upvotes}</span>
      </div>
      
      {isFullPost && (
        <>
          {post.content && <p className="content">{post.content}</p>}
          {post.img_url && <img src={post.img_url} alt="Post content" />}
          <div className="post-actions">
            <button onClick={handleUpvote}>Upvote</button>
            <button onClick={() => navigate(`/edit/${post.id}`)}>Edit</button>
            <button onClick={handleDelete}>Delete</button>
          </div>
          <Comments postId={post.id} />
        </>
      )}
    </div>
  );
};

export default Post;