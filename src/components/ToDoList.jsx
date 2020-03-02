import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { map, groupBy, sortBy, orderBy } from 'lodash'

import * as firebase from "firebase/app";

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import Checkbox from '@material-ui/core/Checkbox';
import DeleteIcon from '@material-ui/icons/Delete';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';

import ItemFields from '../components/ItemFields'

const ToDoList = ({list, setList}) => {
  const [editItem, setEditItem] = useState('')
  const dbItem = key => firebase.database().ref(`/list/${key}`)

  const sortedList = sortBy(list, 'completed')

  const toggleCheck = item => dbItem(item.key).update({ completed: !item.completed })

  const deleteItem = itemKey => dbItem(itemKey).remove();

  const toggleEdit = item => {
    setEditItem(item)
  }

  return <>
    <List>
      {map(sortedList, item => {
        const { key, completed, taskName, description, date } = item
        return editItem === key ? <ItemFields key={key} editItem={editItem} setEditItem={setEditItem} item={item} /> : (
          <ListItem key={key} role={undefined} dense button>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={completed}
                disableRipple
                color="primary"
                inputProps={{ 'aria-labelledby': key }}
                onChange={() => toggleCheck(item)}
              />
            </ListItemIcon>
            <StyledListItemText
              id={key}
              completed={completed}
              primary={<Task>{taskName}</Task> || 'Untitled'}
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
            <EditIcon onClick={() => toggleEdit(key)} color="primary" />
            <DeleteIcon onClick={() => deleteItem(key)}  />
          </ListItem>
        )
      })}
    </List>
  </>
}

export default ToDoList

const Task = styled.span`
  font-weight: bold;
  font-size: 18px;
`

const StyledListItemText = styled(ListItemText)`
  text-decoration: ${({completed}) => completed ? 'line-through' : null};
  opacity: ${({ completed }) => completed ? '0.25' : '1'};
`
