import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './routes/Home'
import About from './routes/About'
import Contact from './routes/Contact'
import Service from './routes/Service'
import Admin from './routes/Admin'
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
        </Routes>
      </Router>
    </>
  );
}

export default App;
