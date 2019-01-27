import { BrowserRouter, Route, Link, Switch } from 'react-router-dom';
import React from 'react';
import LoginScreen from './login.js';
import NotesContainer from './notesContainer.js'

const Router = () => (
  <Switch>
    <Route exact path="/" component={LoginScreen} />
    <Route path="/notes" component={NotesContainer} />
    <Route path="/login" component={LoginScreen} />

  </Switch>
)

export default Router;


