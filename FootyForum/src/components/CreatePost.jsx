// components/CreatePost.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './styles/CreatePost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    img_url: '',
    username: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('Posts')
        .insert([
          { 
            title: formData.title,
            content: formData.content,
            img_url: formData.img_url || null, // Set to null if empty
            username: formData.username,
            upvotes: 0
          }
        ])
        .select();

      if (error) throw error;
      
      // Navigate to the forum page after successful creation
      navigate('/forum');
      
    } catch (error) {
      console.error('Error creating post:', error);
      alert('Error creating post. Please try again.'); // Simple error feedback
    }
  };

  return (
    <div className="create-post">
      <h2>Create New Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Your Username"
          value={formData.username}
          onChange={(e) => setFormData({...formData, username: e.target.value})}
          required
        />
        <input
          type="text"
          placeholder="Post Title"
          value={formData.title}
          onChange={(e) => setFormData({...formData, title: e.target.value})}
          required
        />
        <textarea
          placeholder="Post Content (optional)"
          value={formData.content}
          onChange={(e) => setFormData({...formData, content: e.target.value})}
        />
        <input
          type="url"
          placeholder="Image URL (optional)"
          value={formData.img_url}
          onChange={(e) => setFormData({...formData, img_url: e.target.value})}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;