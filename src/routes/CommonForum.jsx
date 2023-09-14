import React from 'react'
import Forum from '../components/Forum/Forum'
import './Css/CommonForum.css'
import Navbar from '../components/Home/Navbar'
import Footer from '../components/Home/Footer'
const CommonForum = () => {
  return (
    <>
    <Navbar/>
    <div className='common-forum-container'>
      <div className="forum-headings">
      <h1>Forum</h1>
      <p>In the digital realm, a forum is a bustling marketplace of ideas, where the currency is not coins but thoughts shared freely. It's a virtual campfire where curious minds gather, sparking conversations that illuminate the darkest corners of knowledge.</p>
    </div>
      <Forum 
    comments={[]}/></div>
    <Footer/></>
    
  )
}

export default CommonForum