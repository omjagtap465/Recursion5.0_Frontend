import React from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Addblog from './components/Addblog'
import Displayblogs from './components/Displayblogs'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import BlogDetails from './components/Blogdetails'
import Signup from './components/Signup'
import Login from './components/Login'
import Privatecomponent from './private/Privatecomponent'
import SavedBlogs from './components/SavedBlogs'
import SearchedBlogs from './components/SearchedBlogs'
import Footer from './components/Footer'
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route element={<Privatecomponent />}>
          <Route path='/addblog' element={<Addblog />} />
          <Route path='/savedblogs' element={<SavedBlogs />} />
          <Route path='/' element={<Displayblogs />} />
          <Route path="/blog/:id" element={<BlogDetails />} />
          <Route path="/blogs/:search" element={<SearchedBlogs />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
