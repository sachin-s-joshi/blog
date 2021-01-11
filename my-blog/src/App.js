import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import './App.css';
import NavBar from './NavBar';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticlesListPage';
import HomePage from './pages/HomePage'
function App() {
  return (
    <Router>
      <div className='App'>
        <NavBar/>
        <div id='page-body'>
          <Route path='/' component={HomePage} exact />
          <Route path='/about' component={AboutPage} />
          <Route path='/article-list' component={ArticleListPage} />
          <Route path='/article/:name' component={ArticlePage} />
        </div>
      </div>
    </Router>
  );
}

export default App;
