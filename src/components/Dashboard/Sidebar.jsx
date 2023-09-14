import React from 'react'
import "./Sidebar.css"
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import RequestPageTwoToneIcon from '@mui/icons-material/RequestPageTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
const Sidebar = (props) => {
  const role=props.role;
  const sidebarItems={
    admin:[
      {icon:<DashboardTwoToneIcon/>,text:"Dashboard"},
      {icon:<PeopleOutlineTwoToneIcon/>,text:"Users"},
      {icon:<PersonTwoToneIcon/>,text:"Librarians"},
      {icon:<ForumTwoToneIcon/>,text:"Forum"},
      {icon:<RequestPageTwoToneIcon/>,text:"Requests"},
      {icon:<QueryStatsTwoToneIcon/>,text:"reports"},
    ],
    user:[
      {icon:<DashboardTwoToneIcon/>,text:"Dashboard",path:"/user"},
      {icon:<AutoStoriesTwoToneIcon/>,text:"Borrowings",path:"/bookhistory"},
      {icon:<AccountCircleIcon/>,text:"profile",path:"/profile"},
      {icon:<ForumTwoToneIcon/>,text:"Forum",path:"/commonforum"},
      {icon:<ForumTwoToneIcon/>,text:"Notification",path:"/profile"},
      
    ]
    
    //need to add the librarian items
  };

  const renderSideBarItems=()=>{
    const items = sidebarItems[role];
    return (
      <>
       {items.map((item,index)=>(
        <Link to={item.path}><li key={index}>
          {item.icon}
          <span className="text-with-icon">{item.text}</span>
        </li></Link>
      ))}</> 
  );
  };
  return (
    <>
       <div className="sidebar"> 
        <div className="logo">
                   <p>LibraLink</p>
            </div>
           <div className="center">
              <ul className="items">
                {renderSideBarItems()}
              </ul>
          </div>
     
          
       </div>
    </>
 
  )
}

export default Sidebar