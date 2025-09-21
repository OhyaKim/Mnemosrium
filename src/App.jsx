import { useState } from 'react'
import './App.css'
import { supabase } from "./utils/Database"

//---------------import pages.jsx---------------//
import Loading from './pages/Loading'
import InputPage from './pages/Input'
import SendingPage from './pages/Sending'
import FeedPage from "./pages/Feed"

function App() {

  return (
    <>
      
      <Loading></Loading>

      

      {/*
      
      <InputPage></InputPage>


      
      <SendingPage></SendingPage>
      

      <FeedPage></FeedPage>
        */}
    </>
  )
}

export default App
