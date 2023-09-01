import React from 'react'
import "./Css/User.css"
import Sidebar from '../components/Dashboard/Sidebar';
import Hero from "../components/Home/Hero"
import Nav from '../components/Dashboard/Nav';
import search from "../assests/search.jpg"
const User = () => {
  return (
    <div className="user">
        <Sidebar
        role="user"/>
       <div className='userContainer'>
          <Nav
          role="user"/>
         
       </div>
    </div>
  )
}

export default User