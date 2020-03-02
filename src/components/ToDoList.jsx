import React, { useEffect, useState } from 'react'
import { map } from 'lodash'

// Firebase dependencies
import * as firebase from "firebase/app";
import "firebase/analytics";
import "firebase/database";
import { firebaseConfig } from '../config/firebase'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import ItemFields from '../components/ItemFields'

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const ToDoList = () => {
  const [list, setList] = useState([])
  const [editItem, setEditItem] = useState('')
  const dbItem = key => firebase.database().ref(`/list/${key}`)

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

  const toggleCheck = item => dbItem(item.key).update({ completed: !item.completed })


  const deleteItem = itemKey => dbItem(itemKey).remove();

  const toggleEdit = item => {
    setEditItem(item)
  }

  return <>
    <List>
      {map(list, item => {
        const { key, completed, taskName, description, date } = item
        return editItem === key ? <ItemFields key={key} editItem={editItem} setEditItem={setEditItem} item={item} /> : (
          <ListItem key={key} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={completed}
                disableRipple
                inputProps={{ 'aria-labelledby': key }}
                onChange={() => toggleCheck(item)}
              />
            </ListItemIcon>
            <ListItemText
              id={key}
              primary={taskName || 'Untitled'}
              secondary={
                <>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {date}
                  </Typography>
                  <span> - {description || 'No Description'}</span>
                </>
              }
            />
            <EditIcon onClick={() => toggleEdit(key)} />
            <DeleteIcon onClick={() => deleteItem(key)} />
          </ListItem>
        )
      })}
    </List>
  </>
}

export default ToDoList
