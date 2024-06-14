import React from "react"
import style from "./TodoListItem.module.css"

interface Todo {
   title: string;
   id: string;
}

interface TodoListItemProps {
   item: Todo;
   onRemoveTodo: (id: string) => void;
}



const TodoListItem: React.FC<TodoListItemProps> = ({item, onRemoveTodo}) => {
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