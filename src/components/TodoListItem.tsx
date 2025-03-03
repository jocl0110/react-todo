import React, { SetStateAction, useEffect } from "react";
import style from "./TodoListItem.module.css";
import { Todo } from "./TodoList";

interface TodoListItemProps {
  item: Todo;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemoveTodo: (id: string) => void;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  item,
  onRemoveTodo,
  setTodoList,
}) => {
  const handleRemoveTodo = () => {
    onRemoveTodo(item.id);
  };
  const toggleCompleted = async (taskId: string, newStatus: boolean) => {
    try {
      const response = await fetch(
        `https://api.airtable.com/v0/${import.meta.env.VITE_AIRTABLE_BASE_ID}/${
          import.meta.env.VITE_TABLE_NAME
        }/${taskId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fields: {
              completed: newStatus,
            },
          }),
        }
      );
      setTodoList((prevTodos) => {
        return prevTodos.map((todo) => {
          return todo.id === item.id ? { ...todo, completed: newStatus } : todo;
        });
      });
    } catch (error) {
      console.error("Error", error);
    }
  };
  useEffect(() => {}, []);

  return (
    <div className="list-container">
      <input
        type="checkbox"
        checked={item.completed ?? false}
        onChange={() => toggleCompleted(item.id, !item.completed)}
      />
      <li className={style.ListItem}>{item.title}</li>
      <button
        className="remove-button"
        onClick={handleRemoveTodo}
        type="button"
      >
        Remove
      </button>
    </div>
  );
};

export default TodoListItem;
