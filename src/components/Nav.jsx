import React, {useEffect, useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// Firebase dependencies
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import { firebaseConfig } from '../config/firebase'

import ToDoList from '../components/ToDoList';
import ItemFields from '../components/ItemFields';
import Calendar from '../components/Calendar';

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const Nav = () => {
  const [list, setList] = useState([])

  useEffect(() => {
    const dbref = firebase.database().ref('/list/')
    dbref.on('value', (snapshot) => {
      const data = snapshot.val();
      let state = []
      for (let key in data) {
        data[key].key = key;
        state.push(data[key])
      }

      setList(state)
    })
  }, [])

  return (
    <Router>
      <ul>
        <li><Link exact to='/'>List</Link></li>
        <li><Link to='/calendar'>Calendar</Link></li>
      </ul>

      <Switch>
        <Route exact path="/">
          <ItemFields />
          <ToDoList list={list} setList={setList} />
        </Route>
        <Route path="/calendar">
          <Calendar list={list} />
        </Route>
      </Switch>
    </Router>
  )
}

export default Nav
