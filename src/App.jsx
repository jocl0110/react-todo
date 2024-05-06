import React, { useEffect, useState } from 'react'
import './App.css'
import './TodoList'
import TodoList from './TodoList'
import './AddTodoForm'
import AddTodoForm from './AddTodoForm'



function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

    const fetchData = async() => {
      const options = {
        method: 'GET',
        headers:  {Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`} 
      }
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      try{
        const response = await fetch(url, options)
        if(!response.ok){
          const message = `Error :${response.status}`
          throw new Error(message);
        }
        const data = await response.json();
        const todos = data.records.map(record => ({
          title: record.fields.Name,
          id: record.id
        }));
        setTodoList(todos)
        setIsLoading(false);
       }catch (error){
        console.log(error.message)
       }
    }

    React.useEffect(() =>{
      fetchData(); 
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

lesson-1-8
export default App

