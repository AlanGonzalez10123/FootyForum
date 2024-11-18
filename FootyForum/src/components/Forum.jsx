// components/Forum.jsx
import { useState, useEffect } from 'react';
import { supabase } from '../client';
import { useNavigate } from 'react-router-dom'; // Add this
import Post from './Post';
import './styles/Forum.css';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState('created_at');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Add this

  useEffect(() => {
    fetchPosts();
  }, [sortBy]);

  const fetchPosts = async () => {
    try {
      let query = supabase
        .from('Posts')
        .select('*')
        .order(sortBy, { ascending: false });

      if (searchTerm) {
        query = query.ilike('title', `%${searchTerm}%`);
      }

      const { data, error } = await query;
      if (error) throw error;
      setPosts(data || []); // Ensure posts is always an array
    } catch (error) {
      console.error('Error fetching posts:', error);
      setPosts([]); // Set empty array on error
    }
  };

  return (
    <div className="Forum">
      <div className="forum-header">
        <h1>Forum Posts</h1>
        <button className="create-button" onClick={() => navigate('/create')}>
          Create New Post
        </button>
      </div>
      <div className="forum-controls">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && fetchPosts()}
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="created_at">Latest</option>
          <option value="upvotes">Most Upvoted</option>
        </select>
      </div>
      <div className="Posts">
        {posts.length > 0 ? (
          posts.map(post => (
            <Post key={post.id} post={post} />
          ))
        ) : (
          <div className="no-posts">
            <p>No posts found. Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum;