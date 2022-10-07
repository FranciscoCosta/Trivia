import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import logo from './trivia.png';
import './App.css';
import Login from './Pages/Login';
// Grupo 5
export default function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
    </Switch>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={ logo } className="App-logo" alt="logo" />
    //     <p>SUA VEZ - TESTE DA BRANCH</p>
    //   </header>
    // </div>
  );
}
