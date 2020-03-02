import React, { useState } from 'react'
import moment from 'moment'
import MomentUtils from '@date-io/moment';

import * as firebase from "firebase/app";

import TextField from '@material-ui/core/TextField';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

import PostAddIcon from '@material-ui/icons/PostAdd';
import CheckIcon from '@material-ui/icons/Check';

const ItemFields = ({ editItem, setEditItem, item}) => {
  const currentDate = moment().format('MMM DD YYYY')
  const [date, setDate] = useState(currentDate)
  const [taskName, setTaskName] = useState('')
  const [description, setDescription] = useState('')

  const dbItem = item => firebase.database().ref(`/list/${item}`)

  const handleTaskName = input => setTaskName(input.target.value)

  const handleDescription = input => setDescription(input.target.value)

  const handleDate = inputDate => {
    // Cannot push Date Objects to Firebase.
    //Use moment to format Date Object to string in order to push to Firebase.
    const newDate = moment(inputDate).format('MMM DD YYYY')
    setDate(newDate)
  }

  const updateItem = item => {
    dbItem(item.key).update({ taskName, date, description })

    setEditItem('')
  }

  const addItem = () => {
    const newTask = { taskName, date, description, completed: false }
    const dbref = firebase.database().ref('/list/');
    dbref.push(newTask)

    setTaskName('')
    setDate(currentDate)
    setDescription('')
  }

  return <>
    <form noValidate autoComplete="off">
      <TextField id="task-name" label="Task" variant="outlined" onChange={handleTaskName} value={taskName} />
      <TextField id="description" label="Description" multiline variant="outlined" onChange={handleDescription} value={description} />

      <MuiPickersUtilsProvider utils={MomentUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          inputVariant="outlined"
          format="MMM DD YYYY"
          id="date-picker-inline"
          label="Due Date"
          value={date}
          onChange={handleDate}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
      </MuiPickersUtilsProvider>

      {editItem ? <CheckIcon onClick={() => updateItem(item)} />
        : <Button
          variant="contained"
          color="secondary"
          startIcon={<PostAddIcon />}
          onClick={() => addItem()}
        >
          Add Item
        </Button>}
    </form>
  </>
}

export default ItemFields
