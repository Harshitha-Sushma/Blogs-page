// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import BlogPostList from './components/BlogPostList';
import BlogPost from './components/BlogPost';
import AddEditPost from './components/AddEditPost';
import GlobalStyle from './styles/GlobalStyle';

const App = () => (
  <>
    <GlobalStyle />
    <Router>
      <Routes>
        <Route path="/" element={<BlogPostList />} />
        <Route path="/post/:id" element={<BlogPost />} />
        <Route path="/add" element={<AddEditPost />} />
        <Route path="/edit/:id" element={<AddEditPost />} />
      </Routes>
    </Router>
  </>
);

export default App;
