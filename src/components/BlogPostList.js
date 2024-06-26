// src/components/BlogPostList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, deletePost } from '../utils/mockAPI';

const PostListContainer = styled.div`
  padding: 20px;
`;

const PostItem = styled.div`
  padding: 10px;
  margin-bottom: 10px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 10px;
`;

const DeleteButton = styled.button`
  background: red;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
`;

const EditButton = styled.button`
  background: green;
  color: white;
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 10px;
`;

const BlogPostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(getPosts());
  }, []);

  const handleDelete = (id) => {
    deletePost(id);
    setPosts(getPosts());
  };

  return (
    <PostListContainer>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <PostItem key={post.id}>
          {post.image && <PostImage src={post.image} alt={post.title} />}
          <h2>{post.title}</h2>
          <p>{post.summary}</p>
          <p>By {post.author} on {post.publicationDate}</p>
          <Link to={`/post/${post.id}`}>Read more</Link>
          <DeleteButton onClick={() => handleDelete(post.id)}>Delete</DeleteButton>
          <Link to={`/edit/${post.id}`}><EditButton>Edit</EditButton></Link>
        </PostItem>
      ))}
      <Link to="/add">Add New Post</Link>
    </PostListContainer>
  );
};

export default BlogPostList;
