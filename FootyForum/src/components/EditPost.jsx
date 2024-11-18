// components/EditPost.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '../client';
import './styles/CreatePost.css'; // We can reuse the CreatePost styles

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    img_url: '',
    username: ''
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const { data, error } = await supabase
          .from('Posts')
          .select('*')
          .eq('id', id)
          .single();

        if (error) throw error;
        
        setFormData({
          title: data.title,
          content: data.content || '',
          img_url: data.img_url || '',
          username: data.username
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        navigate('/forum');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { error } = await supabase
        .from('Posts')
        .update({ 
          title: formData.title,
          content: formData.content,
          img_url: formData.img_url || null,
          username: formData.username
        })
        .eq('id', id);

      if (error) throw error;
      
      // Navigate to the post page after successful update
      navigate(`/post/${id}`);
      
    } catch (error) {
      console.error('Error updating post:', error);
      alert('Error updating post. Please try again.');
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="create-post">
      <h2>Edit Post</h2>
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
        <div className="form-buttons">
          <button type="submit">Update Post</button>
          <button type="button" onClick={() => navigate(`/post/${id}`)} className="cancel-button">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPost;