import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home'
import About from './routes/About'
import Contact from './routes/Contact'
import Service from './routes/Service'
import Admin from './routes/Admin'
import User from "./routes/User"
import Login from './routes/Login';
import BookView from './routes/BookView';
import Forum from './components/Forum/Forum';
import Profile from './routes/Profile';
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
            <Route path="user/book/:id" element={<BookView/>}/>
           <Route path='/login' element={<Login/>}/>
           <Route path='/Forum' element={<Forum/>}/>
           <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
