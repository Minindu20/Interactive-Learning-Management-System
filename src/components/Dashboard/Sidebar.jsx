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
import PostAddTwoToneIcon from '@mui/icons-material/PostAddTwoTone';
import ExitToAppIcon from '@mui/icons-material/ExitToApp'; 
import { Link } from 'react-router-dom';
const Sidebar = (props) => {
  const handleLogout = () => {}
  const role=props.role;
  const sidebarItems={
    admin:[
      {icon:<DashboardTwoToneIcon/>,text:"Dashboard",path:"/admin"},
      {icon:<PeopleOutlineTwoToneIcon/>,text:"Users",path:"/admin/users"},
      {icon:<PersonTwoToneIcon/>,text:"Librarians",path:"/admin/librarians"},
      {icon:<ForumTwoToneIcon/>,text:"Forum",path:'/admin/forum'},
      // {icon:<RequestPageTwoToneIcon/>,text:"Requests"},
      {icon:<QueryStatsTwoToneIcon/>,text:"Reports",path:"/admin/reports"},
    
    ],
    user:[

      {icon:<DashboardTwoToneIcon/>,text:"Dashboard",path:"/user"},
      {icon:<AutoStoriesTwoToneIcon/>,text:"Borrowings",path:"/bookhistory"},
      {icon:<AccountCircleIcon/>,text:"profile",path:"/Profile"},
      {icon:<ForumTwoToneIcon/>,text:"Forum",path:"/commonforum"},
      {icon:<ForumTwoToneIcon/>,text:"Notification",path:"/notification"},
     
    ],
    librarian:[
      {icon:<DashboardTwoToneIcon/>,text:"Dashboard", path:"/librarian"},
      {icon:<PostAddTwoToneIcon/>,text:"Add Book", path:"/librarian/addbook"},
      {icon:<PeopleOutlineTwoToneIcon/>,text:"Users", path:"/librarian/userlist"},
      {icon:<AutoStoriesTwoToneIcon/>,text:"Books", path:"/librarian/booklist"},
      {icon:<RequestPageTwoToneIcon/>,text:"Requests", path:"/librarian/requestlist"},
      // {icon:<ForumTwoToneIcon/>,text:"Forum",path:"/commonforum"},
      {icon:<QueryStatsTwoToneIcon/>,text:"Reports",path:"/librarian/reports"},
     
    ]
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
       <div className={`sidebar ${role ? 'thin' : ''}`}>
        <div className="logo">
                   <p>LibraLink</p>
            </div>
           <div className="center">
              <ul className="items">
                {renderSideBarItems()}
              </ul>
          </div>
          
          {/* <button className="logout-button" onClick={handleLogout}>
          <ExitToAppIcon />
          <span className="text-with-icon">Logout</span>
        </button> */}
          
     
          
       </div>
    </>
 
  )
}

export default Sidebar