import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import About from './components/layout/About'
import Dashboard from './components/profile/Dashboard'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

import MessageBoard from './components/messages/MessageBoard'
import { Provider } from 'react-redux';
import store from './store';
import './assets/styles/app.scss'
import setHeaders from './utils/setHeaders';
import jwt_decode from 'jwt-decode';
import { setCurrentUser, logoutUser } from './actions/authActions';
import PrivateRoute from './components/common/PrivateRoute';

if (localStorage.jwtToken) {
  // Set auth token header auth
  setHeaders(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = '/login';
  }
}
 
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
        <div className="main">
          <Route exact path="/about" component={About} />
          <PrivateRoute exact path="/user" component={Dashboard} />
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <PrivateRoute exact path="/messages/:name" component={MessageBoard}/>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
