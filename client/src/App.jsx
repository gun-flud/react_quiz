import { useState, useRef, useEffect } from 'react'
import { Routes, Route } from 'react-router'
import Header from './components/layout/Header.jsx'
import Footer from './components/layout/Footer.jsx'
import Home from './pages/Home.jsx'
import Editing from './pages/Editing.jsx'
import Play from './pages/Play.jsx'
import LogIn from './pages/LogIn.jsx'

function App() {

  return (
    <>
    <Header />
    <Routes>
      <Route index element = { <Home /> } />
      <Route path="/create" element={ <Editing /> } />
      <Route path="/edit/:id" element={ <Editing /> } />
      <Route path="/play/:id" element={ <Play /> } />
      <Route path="/results/:id?" element={ <Home /> } />
      <Route path="/result/:Id" element={ <div>Result Page</div> } />
      <Route path="/help" element={ <Home /> } />
      <Route path="/login" element={ <LogIn /> } />
    </Routes>
		<Footer />
    </>
  )
}

export default App
