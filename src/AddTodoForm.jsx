import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';



function AddTodoForm ({onAddTodo}) {

    const [todoTitle, setTodoTitle] = React.useState('')

    const handleTitleChange = (event) => {
        const newTodoTitle = event.target.value;
        console.log(newTodoTitle)
        setTodoTitle(newTodoTitle)
    }

    const handleAddTodo = (event) => {
        event.preventDefault();
        onAddTodo({title: todoTitle, id: Date.now()});
        setTodoTitle('');
    }
    return (
        <form className="form" onSubmit={handleAddTodo}>
            <InputWithLabel
            id = "list"
            required
            value = {todoTitle}
            onChange = {handleTitleChange}
            >  
            </InputWithLabel>
            <button className="add-button" type="submit"><FontAwesomeIcon icon={faPlus} /></button>
        </form>
    )
}

export default AddTodoForm