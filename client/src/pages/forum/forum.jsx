import React, { useEffect, useState } from 'react';
import axios from 'axios';
import darkModeImage from './dark-mode.png';
import './forum.css';
import Sidebar from '../../components/sidebar/Sidebar';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newPostContent, setNewPostContent] = useState('');
  const [showNewPostForm, setShowNewPostForm] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/forum/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const getRandomAvatar = () => {
    return `https://via.placeholder.com/128/${Math.floor(Math.random() * 1000)}`;
  };

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const handleLike = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.post(`http://localhost:3000/api/v1/forum/posts/${postId}/like`, {}, config);
      fetchPosts();
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  const handleComment = async (postId) => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const commentText = 'Your comment text goes here'; // Replace with the actual comment text

      await axios.post(
        `http://localhost:3000/api/v1/forum/comments/create/${postId}`,
        { text: commentText },
        config
      );

      fetchPosts(); // Fetch posts again to get the updated data
    } catch (error) {
      console.error('Error creating comment:', error.response?.data || error.message);
    }
  };

  const handleNewPostSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
  
      // Validate if the new post content is not empty
      if (!newPostContent.trim()) {
        console.error('New post content cannot be empty');
        return;
      }
  
      const newPostData = {
        title: 'Your Post Title', // Replace with the actual post title
        content: newPostContent,
      };
  
      await axios.post('http://localhost:3000/api/v1/forum/posts/create', newPostData, config);
  
      fetchPosts(); // Fetch posts again to get the updated data
      setNewPostContent('');
      setShowNewPostForm(false);
    } catch (error) {
      console.error('Error creating new post:', error.response?.data || error.message);
    }
  };

  return (
    <div className={`forum-container ${darkMode ? 'dark-mode' : ''}`}>
      <Sidebar />
      <button onClick={toggleDarkMode} className="dark-mode-toggle">
        <img className="darkMoodImg" src={darkModeImage} alt="Toggle Dark Mode" />
      </button>
      <h1>Forum</h1>
      <div className="post-list">
        {posts.map((post) => (
          <div key={post._id} className="post">
            <div className="user-info">
              <img src={getRandomAvatar()} alt="User Avatar" />
              <span>{post.user.name}</span>
            </div>
            <div className="post-content">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
            <div className="post-actions">
              <button className="like-button" onClick={() => handleLike(post._id)}>
                Like ({post.likes})
              </button>
              <button className="comment-button" onClick={() => handleComment(post._id)}>
                Comment
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={() => setShowNewPostForm(true)}>Create New Post</button>
      {showNewPostForm && (
        <div className="new-post-form">
          <textarea
            rows="4"
            placeholder="Enter your new post content..."
            value={newPostContent}
            onChange={(e) => setNewPostContent(e.target.value)}
          />
          <button onClick={handleNewPostSubmit}>Submit</button>
        </div>
      )}
    </div>
  );
};

export default Forum;
