// src/components/AddEditPost.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts, addPost, updatePost } from '../utils/mockAPI';

const FormContainer = styled.div`
  padding: 20px;
`;

const FormGroup = styled.div`
  margin-bottom: 10px;
`;

const FormLabel = styled.label`
  display: block;
  margin-bottom: 5px;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormTextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  background: blue;
  color: white;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 4px;
`;

const AddEditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: '', author: '', content: '', publicationDate: '', summary: '', image: '' });
  const posts = getPosts();

  useEffect(() => {
    if (id) {
      const postToEdit = posts.find(post => post.id === id);
      if (postToEdit) {
        setPost(postToEdit);
      }
    }
  }, [id, posts]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setPost({ ...post, image: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updatePost(post);
    } else {
      addPost(post);
    }
    navigate('/');
  };

  return (
    <FormContainer>
      <h1>{id ? 'Edit Post' : 'Add Post'}</h1>
      <form onSubmit={handleSubmit}>
        <FormGroup>
          <FormLabel>Title</FormLabel>
          <FormInput
            type="text"
            name="title"
            value={post.title}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Author</FormLabel>
          <FormInput
            type="text"
            name="author"
            value={post.author}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Publication Date</FormLabel>
          <FormInput
            type="date"
            name="publicationDate"
            value={post.publicationDate}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Summary</FormLabel>
          <FormTextArea
            name="summary"
            value={post.summary}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Content</FormLabel>
          <FormTextArea
            name="content"
            value={post.content}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Image</FormLabel>
          <FormInput
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </FormGroup>
        <SubmitButton type="submit">{id ? 'Update Post' : 'Add Post'}</SubmitButton>
      </form>
    </FormContainer>
  );
};

export default AddEditPost;

        