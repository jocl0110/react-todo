import React from "react";

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

function TodoList () {
    return (
        <ul>
        {todoList.map(function (item) {
        return <li key={item.id}>{item.title}</li>;
      })}
      </ul>
    )
}


export default TodoList