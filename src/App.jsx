import './App.css'
import React from 'react'
import { Routes, Route } from "react-router-dom";
import Menu from "./assets/components/Menu"
import Home from "./assets/views/Home"
import Carrito from "./assets/views/Carrito"
import Pizza from "./assets/views/Pizza"

const App = () => {
  return (
    <div className='App'>
      <Menu></Menu>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route path="/Pizza/:id" element={<Pizza />}></Route>
        <Route path="/Carrito" element={<Carrito />}></Route>
      </Routes>
    </div>
  )
}
export default App