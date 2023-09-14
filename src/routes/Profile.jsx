import React, { useState } from "react";
import Navbar from '../components/Home/Navbar'
import Sidebar from '../components/Dashboard/Sidebar'
import Footer from "../components/Home/Footer";
import user from '../../src/assests/user.png';
import { Link } from 'react-router-dom'
import './Css/profile.css'
const Profile = () => {
  const[name,setName]=useState('Minindu Hansitha');
  const[email,setEmail]=useState('john.doe@example.com');
  const[address,setAddress]=useState('New York, USA');
  const[password,setPassword]=useState('@34$hy');
  const[isEditing,setEditing]=useState(false)
  
  const handleEditClick=()=>{
     setEditing(true);
  }
  const handleSaveClick=()=>{
    setEditing(false);
  }
  const handleCancelClick=()=>{
    setEditing(false);
  }

  return (
    
      <> <Navbar/>
      <div className="back">
      <button className='back-btn'><Link to='/user'>Go back</Link></button>
      </div>
     
      <div className="user-container">
        <div className="user-image">
            <img src={user} alt="User's Profile Image"/>
        </div>
        <div className="user-details">
          {isEditing ?(
            <>
            <p>
                <strong>Name: </strong>
                <input className="profile-input"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </p>
              <p>
                <strong>Email: </strong>
                <input className="profile-input"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </p>
              <p>
                <strong>Address: </strong>
                <input className="profile-input"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </p>
              <p>
                <strong>Password: </strong>
                <input className="profile-input"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </p>
            
              <button className='left-button' onClick={handleSaveClick}>Save</button>
              <button onClick={handleCancelClick}>Cancel</button>
            </>
          ) :(
            <>
             <h1>User Details</h1>
            <p><strong>Name: </strong>{name}</p>
            <p><strong>Email: </strong>{email}</p>
            <p><strong>Address: </strong>{address}</p>
            <p><strong>Password: </strong>{password}</p>
            <button className="custom-btn" onClick={handleEditClick}>Edit</button>
            </>
          ) 
        }
        </div>
    </div>
    <Footer/>
    </>
     
  )
}

export default Profile