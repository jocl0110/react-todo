import React from "react"
import TodoList from "./TodoList"
import style from "./TodoListItem.module.css"


const TodoListItem = ({item, onRemoveTodo}) => {
   const handleRemoveTodo = () => {
        onRemoveTodo(item.id);
   };
    
return ( 
   <div className="list-container">
   <input type="checkbox" />
   <li className={style.ListItem}>{item.title}</li>
   <button className="remove-button" onClick={handleRemoveTodo} type="button">Remove</button>
   </div>
   );
};


export default TodoListItem