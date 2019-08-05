import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import About from './components/layout/About'
import Dashboard from './components/Profile/Dashboard'
import Login from './components/auth/Login'
import './assets/styles/app.scss'
function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="main">
        <Route exact path="/about" component={About} />
        <Route exact path="/user" component={Dashboard} />
        <Route exact path="/" component={Login}/>
      </div>
    </BrowserRouter>
  );
}

export default App;
