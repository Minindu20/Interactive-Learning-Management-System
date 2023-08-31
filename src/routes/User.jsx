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
          <Hero
           role="user"
           cName="hero-mid"
           heroImage={search}
           title="Unlock the World of Knowledge"
           text="Welcome to our online library, your digital portal to a treasure trove of books, articles, and resources. Immerse yourself in stories, learn from experts, and embark on a journey of exploration."   
    />
        
       </div>
    </div>
  )
}

export default User