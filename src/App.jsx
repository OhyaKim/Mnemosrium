import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { supabase } from "./utils/Database"

//---------------import pages.jsx---------------//
import Loading from './pages/Loading'
import InputPage from './pages/Input'
import SendingPage from './pages/Sending'
import FeedPage from "./pages/Feed"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Loading/>} />
        <Route path='/Input' element={<InputPage/>} />
        <Route path='/Sending' element={<SendingPage/>} />
        <Route path='/Feeds' element={<FeedPage/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
