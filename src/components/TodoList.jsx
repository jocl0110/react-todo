import React from "react";
import TodoListItem from "./TodoListItem";
import PropTypes from 'prop-types';



function TodoList ({todoList, onRemoveTodo}) {
    return (
        <ul>
        {todoList.map((item) => {
          return(
          <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo}/>
          );
        })}
      </ul>
    )
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
  onRemoveTodo: PropTypes.func.isRequired,
};




export default TodoList