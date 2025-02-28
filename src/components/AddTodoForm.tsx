import React, { useState } from "react";
import InputWithLabel from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "./TodoList";

interface AddTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) return;

    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}`;
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
      body: JSON.stringify({
        fields: {
          Name: todoTitle,
        },
      }),
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
        title: data.fields.Name,
        completed: false,
      };
      onAddTodo(newTodo);
      setTodoTitle("");
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };
  return (
    <form className="form" onSubmit={handleAddTodo}>
      <InputWithLabel
        id="list"
        required
        value={todoTitle}
        onChange={handleTitleChange}
      ></InputWithLabel>
      <button className="add-button" type="submit">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </form>
  );
};

export default AddTodoForm;
