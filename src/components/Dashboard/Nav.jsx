import React from 'react'
import'./Nav.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Nav = (props) => {
  const role=props.role; 
  return (
    <>
        <div className="navbar">
             <div className="wrapper">
                
                  { role=='admin' &&(
                     <div className='search'>
                      <input type="text" placeholder='search'/>
                         <SearchOutlinedIcon/>
                     </div>
                  )
                  }    
                <div className='items'>
                    <div className='item'>
                         <AccountCircleIcon/>
                    </div>
                </div>
             </div>
       </div>
    </>
  
  )
}

export default Nav