import React, { useState } from "react";
import Input from "./InputWithLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Todo } from "./TodoList";

interface AddTodoFormProps {
  onAddTodo: (newTodo: Todo) => void;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const AddTodoForm: React.FC<AddTodoFormProps> = ({
  onAddTodo,
  setMessage,
  isLoading,
  setIsLoading,
}) => {
  const [todoTitle, setTodoTitle] = useState<string>("");

  const handleAddTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!todoTitle) {
      setMessage("Your task should have some text");
      return;
    }

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
      setIsLoading(true);
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      const newTodo = {
        id: data.id,
        title: data.fields.Name,
        createdTime: data.createdTime,
        completed: data.fields.completed,
      };
      onAddTodo(newTodo);
      setTodoTitle("");
      setIsLoading(false);
    } catch (error) {
      setMessage(`Something went wrong while creating your task ${error}`);
      setIsLoading(false);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoTitle(event.target.value);
  };
  return (
    <form className="form" onSubmit={handleAddTodo}>
      <Input id="list" value={todoTitle} onChange={handleTitleChange}></Input>
      <button className="add-button">
        <FontAwesomeIcon type="submit" icon={faPlus} />
      </button>
    </form>
  );
};

export default AddTodoForm;
