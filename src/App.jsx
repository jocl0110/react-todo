import React, { useEffect, useState } from 'react'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import './AddTodoForm'
import AddTodoForm from './AddTodoForm'



function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);



    React.useEffect(() =>{
      const savedTodoList = JSON.parse(localStorage.getItem('savedTodoList')) || [];
      const fetchData = new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve({data: {todoList: savedTodoList}})
        }, 2000)
      });
      
      fetchData.then((result) => {
        setTodoList(result.data.todoList);
        setIsLoading(false);
      })
  }, [])

 

    React.useEffect(() => {
      if(isLoading === false){
      localStorage.setItem('savedTodoList' , JSON.stringify(todoList))
      }
    }, [todoList]);
    


  

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
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
}

export default App