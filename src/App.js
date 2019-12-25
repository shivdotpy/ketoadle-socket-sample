import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import { Login } from './components/Login';
import { Chat } from './components/Chat';
import { Users } from './components/Users';


function App() {
  return (
    <Router>
      <Route exact path="/" component={Login}/>
      <Route exact path="/users" component={Users} />
      <Route exact path="/chat/:id" component={Chat}/>
    </Router>
  );
}

export default App;
