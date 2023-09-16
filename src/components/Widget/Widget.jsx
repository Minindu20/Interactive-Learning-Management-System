import React from 'react'
import '../Widget/Widget.css'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ImportContactsOutlinedIcon from '@mui/icons-material/ImportContactsOutlined';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import ChecklistOutlinedIcon from '@mui/icons-material/ChecklistOutlined';
const Widget = ({type}) => {
    let data;
    const amount = 100;
    switch(type){
      case "user":
         data={
          title:"USERS",
          link:"See All Users",
          icon:<PersonOutlineOutlinedIcon className='icon'/>,
         };
         break;
        case "books":
            data={
                title:"BOOKS",
                link:"See All Books",
                icon:<ImportContactsOutlinedIcon className='icon'/>
               };
               break;
        case "requests":
            data={
                 title:"REQUESTS",
                link:"See All Requests",
                icon:<MessageOutlinedIcon className='icon'/>
                   };
                   break;
        case "recent":
            data={
                title:"RECENT",
                link:"See Recent Activities",
                icon:<ChecklistOutlinedIcon className='icon'/>
                 };
                   break;
        default:
            break;
    }
  return (
    <div className="widget">
        <div className="left">
            <span className='title'>{data.title}</span>
            <span className='counter'>{amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className="right">
            <div className='Number'>
                <KeyboardArrowUpIcon/>
            </div>
            {data.icon}
        </div>
    </div>
  )
}

export default Widget