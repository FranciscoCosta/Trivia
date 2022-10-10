import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
import Game from './Pages/Game';
import Settings from './Pages/Settings';
import Feedback from './Pages/Feedback';
// Grupo 5
export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route exact path="/game" component={ Game } />
      <Route exact path="/settings" component={ Settings } />
      <Route exact path="/feedback" component={ Feedback } />
    </Switch>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={ logo } className="App-logo" alt="logo" />
    //     <p>SUA VEZ - TESTE DA BRANCH</p>
    //   </header>
    // </div>
  );
}
