import React, { useEffect, useState } from 'react'
import './App.css'
import './components/TodoList'
import './components/AddTodoForm'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import TodoListPage from './TodoListPage'




function App() {

  const [todoList, setTodoList] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  

    const fetchData = async() => {
      const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
      const options = {
        method: 'GET',
        headers:  {Authorization:`Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`} 
      }
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

  const removeTodo = async (id) => {
    const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}/${id}`;
      const options = {
        method: "DELETE",
        headers: {Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`},
      };

      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          const message = `Error ${response.status}`;
          throw new Error(message);
        }
        const newTodoList = todoList.filter(todo => todo.id !== id);
        setTodoList(newTodoList);
      } catch (error) {
        console.error('Error:', error.message);
      }
  }


  return (
    <BrowserRouter>
    <Routes>
    <Route path='/' element={
    <TodoListPage 
    todoList={todoList}
    isLoading={isLoading}
    addTodo={addTodo}
    removeTodo={removeTodo}
    />}>
    </Route>
    <Route path='/new' element={<h1>New Todo List</h1>}></Route>
    </Routes>
    </BrowserRouter>
  );
}

export default App

