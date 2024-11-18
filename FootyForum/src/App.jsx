import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Forum from './components/Forum'
import News from './components/News'
import NotFound from './components/NotFound'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import SinglePost from './components/SinglePost'
import EditPost from './components/EditPost' // Add this import
import './App.css'

function App() {
  return (
    <div className="App">
      <div className='nav'>  
        <Navbar/>
      </div>
      <Routes>        
        <Route path="/" element={<Home />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/create" element={<CreatePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
        <Route path="/edit/:id" element={<EditPost />} /> {/* Add this route */}
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;