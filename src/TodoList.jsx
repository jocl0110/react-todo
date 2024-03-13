import React from "react";
import TodoListItem from "./TodoListItem";


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
          return(
          <TodoListItem key={item.id} item={item} />
          );
        })}
      </ul>
    )
}


export default TodoList