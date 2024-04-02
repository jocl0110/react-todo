import React, { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import './AddTodoForm'
import AddTodoForm from './AddTodoForm'

const semiPersistentState = () => {

  const [todoList, setTodoList] = React.useState(() => {

    const savedTodoList = localStorage.getItem('savedTodoList')
    return JSON.parse(savedTodoList) || [];
  });
  
    React.useEffect(() => {
      localStorage.setItem('savedTodoList' , JSON.stringify(todoList))
    }, [todoList]);
    return [todoList, setTodoList];
}

function App() {

  const [todoList, setTodoList] = semiPersistentState();
  
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }


  return (  
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList}/>
    </div>
  );
}

export default App
