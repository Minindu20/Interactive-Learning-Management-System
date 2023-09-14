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
import BookList from './routes/BookList';
import Login from './routes/Login';
import RequestList from './routes/RequestList';
function App() {
  return (
    <>
      <Router>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/service' element={<Service/>}/>
           <Route path='/contact' element={<Contact/>}/>
           <Route path='/admin' element={<Admin/>}/>
           <Route path='/user' element={<User/>}/>
           <Route path='/librarian' element={<Librarian/>}/>
           <Route path='/librarian/addbook' element={<AddBook/>}/>
           <Route path='/librarian/userlist' element={<UserList/>}/>
           <Route path='/librarian/booklist' element={<BookList/>}/>
           <Route path='/librarian/requestlist' element={<RequestList/>}/>
           <Route path='/login' element={<Login/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
