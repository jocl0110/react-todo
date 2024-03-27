import React, { useState } from "react";



function AddTodoForm ({onAddTodo}) {

    const [todoTitle, setTodoTitle] = React.useState('')

    function handleTitleChange (event) {
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
        <form onSubmit={handleAddTodo}>
            <label htmlFor="todoTitle">Title</label>
            <input id="todoTitle" name="title" required value={todoTitle} onChange={handleTitleChange}/>
            <button type="submit">Add</button>
        </form>
    )
}

export default AddTodoForm