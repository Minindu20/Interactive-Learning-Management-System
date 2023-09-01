import React, {useState} from 'react';
import "./Css/Login.css"
import Footer from "../components/Home/Footer";
import Navbar from '../components/Home/Navbar';
import heroImage7 from '../assests/hero6.jpg';
const Login = () => {

  const [action,setAction]=useState("Sign Up");
  return (
    <>
      <Navbar/> 
      <form>
      <div className='container'>
     <div className="left">
        <img
            className='background-image'
            src={heroImage7}
            alt='Background'
          />
        </div> 
        <div className="right">
        <div className='form-box'>
        <div className='header'>
            <div className='text'>{action}</div>
            <div className="underline"></div>
        </div>
        <div className='inputs'>
            
            {action==="Sign Up" &&(
                <div className='input'>
                    <input type="text" placeholder="Username" name="psw" required/>
            </div>
            )}
            <div className='input'>
               <input type="text" placeholder="Email" name="psw" required/>
            </div>
            <div className='input'>
            <input type="password" placeholder="Password" name="psw-repeat" required/>
            </div>
        </div>
        <div className="submit-container">
            <button className={action==="Login"?"submit gray":"submit"} onClick={()=>{setAction("Sign Up")}} type="submit">Sign Up</button>
            <button className={action==="Sign Up"?"submit gray":"submit"} onClick={()=>{setAction("Login")}} type="button">Login</button>
        </div>
        </div>
        
        </div>
       
    </div>
      </form>
    
    <Footer/>
    </>
    
   
  )
}

export default Login