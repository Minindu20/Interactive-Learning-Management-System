import React from 'react'
import "./Sidebar.css"
import DashboardTwoToneIcon from '@mui/icons-material/DashboardTwoTone';
import PeopleOutlineTwoToneIcon from '@mui/icons-material/PeopleOutlineTwoTone';
import PersonTwoToneIcon from '@mui/icons-material/PersonTwoTone';
import AutoStoriesTwoToneIcon from '@mui/icons-material/AutoStoriesTwoTone';
import ForumTwoToneIcon from '@mui/icons-material/ForumTwoTone';
import RequestPageTwoToneIcon from '@mui/icons-material/RequestPageTwoTone';
import QueryStatsTwoToneIcon from '@mui/icons-material/QueryStatsTwoTone';

const Sidebar = () => {
  return (
    <>
       <div className="sidebar">
        <div className='sidebar-wrapper'>
        <div className="logo">
                   <p>BOOKHUB</p>
            </div>
           <div className="center">
              <ul className="items">
                <li>
                  <DashboardTwoToneIcon className="icon"/>
                  <span className="text-with-icon"> Dashboard</span>
                </li>
                <li>
                  <PeopleOutlineTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Users</span>
                </li>
                <li>
                  <PersonTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Librarians</span>
                </li>
                <li>
                  <AutoStoriesTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Book Management</span>
                </li>
                <li>
                  <ForumTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Forum</span>
                </li>
                <li>
                  <RequestPageTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Requests</span>
                </li>
                <li>
                  <QueryStatsTwoToneIcon className="icon"/>
                  <span className="text-with-icon">Analytics</span>
                </li>
              </ul>
          </div>
        </div>
          
       </div>
    </>
 
  )
}

export default Sidebar