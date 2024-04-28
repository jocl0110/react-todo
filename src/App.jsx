import React, { useState } from 'react'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import './AddTodoForm'
import AddTodoForm from './AddTodoForm'

const useSemiPersistentState = () => {

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

  const [todoList, setTodoList] = useSemiPersistentState();
  
  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo])
  }

  const removeTodo = (id) => {
    const newTodoList = todoList.filter(todo => todo.id !== id)
    setTodoList(newTodoList);
  }


  return (  
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      <TodoList todoList={todoList} onRemoveTodo={removeTodo}/>
    </div>
  );
}

export default App
