import React from 'react'
import { Route, Routes } from "react-router-dom";
import LipsIndividual from '../components/IndividualPages/LipsIndividual';
import MakeupIndividual from '../components/IndividualPages/MakeupIndividual';
import Brushes from '../Pages/Brushes'
import Cart from '../Pages/Cart';
import Eyes from '../Pages/Eyes';
import Face from '../Pages/Face'
import Homepage from '../Pages/Homepage'
import Lips from '../Pages/Lips'
import Login from '../Pages/Login'
import Makeup from '../Pages/Makeup'
import Search from '../Pages/Search';
import Skincare from '../Pages/Skincare'
import Trending from '../Pages/Trending'

export default function MainRoute() {
  return (
    <div>
      <Routes>
        <Route path="/"  element={<Homepage/>}></Route>
        <Route path="/login"  element={<Login/>}></Route>
        <Route path="/cart"  element={<Cart/>}></Route>
        <Route path="/makeup"  element={<Makeup/>}></Route>
        <Route path="/brushes"  element={<Brushes/>}></Route>
        <Route path="/skincare"  element={<Skincare/>}></Route>
        <Route path="/trending"  element={<Trending/>}></Route>
        <Route path="/lips"  element={<Lips/>}></Route>
        <Route path="/eyes"  element={<Eyes/>}></Route>
        <Route path="/Face"  element={<Face/>}></Route>
        <Route path="/makeup/:id"  element={<MakeupIndividual/>}></Route>
        <Route path="/lips/:id"  element={<LipsIndividual/>}></Route>
        <Route path="/search/"  element={<Search/>}></Route>
        
       </Routes>
    </div>
  )
}
