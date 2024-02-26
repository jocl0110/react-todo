import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const todoList = [
  {
    id: 1,
    title: "Start the lesson"
  },
  {
    id: 2,
    title: "Finish the lesson"
  },
  {
    id: 3,
    title: "Complete assignment"
  }
];

function App() {
  
  return (  
    <div>
      <h1>Todo List</h1>
      <ul>
        {todoList.map(function (item) {
        return <li key="item.id">{item.title}</li>;
      })}
      </ul>
    </div>
  );
}

export default App
