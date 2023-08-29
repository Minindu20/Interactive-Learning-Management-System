import React from 'react'
import'./Nav.css'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
const Nav = () => {
  return (
    <>
        <div className="navbar">
             <div className="wrapper">
                <div className='search'>
                    <input type="text" placeholder='search'/>
                    <SearchOutlinedIcon/>
                </div>
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