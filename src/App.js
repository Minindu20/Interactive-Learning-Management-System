import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home';
import About from './routes/About';
import Contact from './routes/Contact';
import Service from './routes/Service';
import Admin from './routes/Admin';
import User from "./routes/User";
import Librarian from "./routes/Librarian";
import AddBook from "./routes/AddBook";
import UserList from './routes/UserList';
import UsersList from './routes/UsersList';
import BookList from './routes/BookList';
import Login from './routes/Login';
import BookView from './routes/BookView';
import Forum from './components/Forum/Forum';
import Profile from './routes/Profile';
import BookHistory from './routes/BookHistory';
import CommonForum from './routes/CommonForum';
import RequestList from './routes/RequestList';
import LibrarianData from './routes/LibrarianData';
import RemovePosts from './routes/RemovePosts';
import Notification from './routes/Notification';
import Reports from './routes/Reports';
import ReportMostReadBooks from './routes/ReportMostReadBooks';
import ReportOverdueReturns from './routes/ReportOverdueReturns';
import ReportUserFines from './routes/ReportUserFines';
function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/service' element={<Service/>}/>
           <Route path='/contact' element={<Contact/>}/>
           
          
           <Route path='/login' element={<Login/>}/>

           <Route path='/admin' element={<Admin/>}/>
           <Route path='/admin/users' element={<UsersList/>}/>
           <Route path='/admin/librarians' element={<LibrarianData/>}/>
           <Route path='/admin/forum' element={<RemovePosts/>}/>
           <Route path='/admin/reports' element={<Reports role="admin"/>}/>
           <Route path='/admin/reports/mostreadbooks' element={<ReportMostReadBooks role="admin"/>}/>
           <Route path='/admin/reports/overduereturns' element={<ReportOverdueReturns role="admin"/>}/>
           <Route path='/admin/reports/userfines' element={<ReportUserFines role="admin"/>}/>

           <Route path='/librarian' element={<Librarian/>}/>
           <Route path='/librarian/addbook' element={<AddBook/>}/>
           <Route path='/librarian/userlist' element={<UserList/>}/>
           <Route path='/librarian/booklist' element={<BookList/>}/>
           <Route path='/librarian/requestlist' element={<RequestList/>}/>
           <Route path='/commonforum' element={<CommonForum/>}/>
           <Route path='/librarian/reports' element={<Reports role="librarian"/>}/>
           <Route path='/librarian/reports/mostreadbooks' element={<ReportMostReadBooks role="librarian"/>}/>
           <Route path='/librarian/reports/overduereturns' element={<ReportOverdueReturns role="librarian"/>}/>
           <Route path='/librarian/reports/userfines' element={<ReportUserFines role="librarian"/>}/>

           <Route path='/user' element={<User/>}/>
           <Route path="user/book/:id" element={<BookView/>}/>
           
           <Route path='/Forum' element={<Forum/>}/>
           <Route path='/Profile' element={<Profile/>}/>
           <Route path='/bookhistory' element={<BookHistory/>}/>
           <Route path='/notification' element={<Notification/>}/>

        </Routes>
      </Router>
    </>
  );
}

export default App;
