import React from 'react';
import './css/App.css';
import Layout from './components/Layout'
import NewsFeed from './components/NewsFeed'

function App() {
  return (
    <Layout title="Web Scraping - State Management">
      <NewsFeed />
    </Layout>
  );
}

export default App;