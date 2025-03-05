import React, { SetStateAction, useEffect } from "react";
import style from "./TodoListItem.module.css";
import TodoList, { Todo } from "./TodoList";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TodoListItemProps {
  item: Todo;
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemoveTodo: (id: string) => void;
  index: number;
}

const TodoListItem: React.FC<TodoListItemProps> = ({
  item,
  todoList,
  onRemoveTodo,
  setTodoList,
  index,
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
    <>
      <div className="list-container">
        <input
          type="checkbox"
          checked={item.completed ?? false}
          onChange={() => toggleCompleted(item.id, !item.completed)}
        />
        <li
          className={`${style.ListItem} ${item.completed ? "completed" : ""}`}
        >
          {item.title}
        </li>

        <FontAwesomeIcon
          icon={faXmark}
          className="remove-button"
          onClick={handleRemoveTodo}
          type="button"
        ></FontAwesomeIcon>
      </div>
      {index !== todoList.length - 1 && <hr className="divider" />}
    </>
  );
};

export default TodoListItem;
