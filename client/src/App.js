import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import About from './components/layout/About'

function App() {
  return (
    <BrowserRouter>
      <Navbar/>
      <div className="main">
        <Route exact path="/about" component={About} />
      </div>
    </BrowserRouter>
  );
}

export default App;
