import React from "react"
import TodoList from "./TodoList"


const TodoListItem = ({item, onRemoveTodo}) => {
   const handleRemoveTodo = () => {
        onRemoveTodo(item.id);
   };
    
return ( 
   
   <li>{item.title}<button onClick={handleRemoveTodo} type="button">Remove</button></li>
   );
};


export default TodoListItem