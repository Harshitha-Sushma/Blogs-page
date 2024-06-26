// src/components/BlogPost.js
import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { getPosts } from '../utils/mockAPI';

const PostContainer = styled.div`
  padding: 20px;
`;

const PostImage = styled.img`
  max-width: 100%;
  height: auto;
  margin-bottom: 20px;
`;

const BlogPost = () => {
  const { id } = useParams();
  const posts = getPosts();
  const post = posts.find(post => post.id === id);

  return (
    <PostContainer>
      {post ? (
        <>
          {post.image && <PostImage src={post.image} alt={post.title} />}
          <h1>{post.title}</h1>
          <p>By {post.author} on {post.publicationDate}</p>
          <div>{post.content}</div>
        </>
      ) : (
        <p>Post not found</p>
      )}
    </PostContainer>
  );
};

export default BlogPost;
