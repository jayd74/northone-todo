import React from 'react';
import ToDoList from './components/ToDoList';
import ItemFields from './components/ItemFields';

const App = () => {
  return <>
    <h2>Northone To do</h2>
    <ItemFields />
    <ToDoList />
  </>
}

export default App;
