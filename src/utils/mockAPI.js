// src/utils/mockAPI.js

const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

export const getPosts = () => {
  const posts = localStorage.getItem('blogPosts');
  return posts ? JSON.parse(posts) : [];
};

const savePosts = (posts) => {
  localStorage.setItem('blogPosts', JSON.stringify(posts));
};

export const addPost = (post) => {
  const posts = getPosts();
  const newPost = { ...post, id: generateId() };
  posts.push(newPost);
  savePosts(posts);
  return newPost;
};

export const updatePost = (updatedPost) => {
  const posts = getPosts();
  const postIndex = posts.findIndex(post => post.id === updatedPost.id);
  if (postIndex !== -1) {
    posts[postIndex] = updatedPost;
    savePosts(posts);
    return updatedPost;
  }
  return null;
};

export const deletePost = (id) => {
  let posts = getPosts();
  posts = posts.filter(post => post.id !== id);
  savePosts(posts);
};
