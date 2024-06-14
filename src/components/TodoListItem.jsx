import React from "react"
import style from "./TodoListItem.module.css"
import PropTypes from 'prop-types';


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


TodoListItem.propTypes = {
   item: PropTypes.shape({
     id: PropTypes.string.isRequired,
     title: PropTypes.string.isRequired,
   }).isRequired,
   onRemoveTodo: PropTypes.func.isRequired,
 };


export default TodoListItem