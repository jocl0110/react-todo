import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from '@fortawesome/free-solid-svg-icons';



function AddTodoForm ({onAddTodo}) {

    const [todoTitle, setTodoTitle] = React.useState('')


    const handleAddTodo = async (event) => {
        event.preventDefault();
    
        if (!todoTitle) return;
    
        const url = `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${import.meta.env.VITE_TABLE_NAME}`;
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`
          },
          body: JSON.stringify({
            fields: {
              Name: todoTitle
            }
          })
        };
    
        try {
          const response = await fetch(url, options);
          if (!response.ok) {
            const message = `Error: ${response.status}`;
            throw new Error(message);
          }
          const data = await response.json();
          const newTodo = {
            id: data.id,
            title: data.fields.Name
          };
          onAddTodo(newTodo);
          setTodoTitle(''); 
        } catch (error) {
          console.error('Error:', error.message);
        }
      };


    const handleTitleChange = (event) => {
        setTodoTitle(event.target.value);
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