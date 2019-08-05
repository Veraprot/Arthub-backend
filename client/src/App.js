import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import About from './components/layout/About'
import Dashboard from './components/Profile/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/app.scss'

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <div className="main">
          <Route exact path="/about" component={About} />
          <Route exact path="/user" component={Dashboard} />
          <Route exact path="/" component={Login}/>
          <Route exact path="/register" component={Register}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
