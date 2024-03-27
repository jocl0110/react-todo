import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import './AddTodoForm'
import AddTodoForm from './AddTodoForm'


function App() {
  
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const [todoList, setTodoList] = React.useState([])

  return (  
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App
