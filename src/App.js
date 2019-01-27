import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import './components/tabbar.css'
import Navbar from './components/navbar.js';
import LoginScreen from './components/login.js';
import NotesContainer from './components/notesContainer.js';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import Router from './components/router.js'
import { BrowserRouter } from 'react-router-dom';




class App extends Component {
  render() {
    return (
      <BrowserRouter>
      <div className="App">
          <Router />
          <Navbar />

      </div>
      </BrowserRouter>
    );
  }
}

export default App;
