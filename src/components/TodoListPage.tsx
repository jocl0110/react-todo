import React from "react";
import AddTodoForm from "./AddTodoForm.tsx";
import TodoList from "./TodoList.tsx";
import { Todo } from "./TodoList";

interface TodoListPageProps {
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  todoList: Todo[];
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  setOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setSortByDate: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoListPage: React.FC<TodoListPageProps> = ({
  addTodo,
  removeTodo,
  todoList,
  message,
  setMessage,
  isLoading,
  setIsLoading,
  setOrder,
  setSortByDate,
  setTodoList,
}) => {
  const baseURL = `https://api.airtable.com/v0/${
    import.meta.env.VITE_AIRTABLE_BASE_ID
  }/${import.meta.env.VITE_TABLE_NAME}`;
  const deleteOptions = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
    },
  };
  const handleClearAll = async () => {
    if (todoList.length === 0) {
      setMessage("You have no task to be cleared");
      return;
    }
    const recordIds = todoList.map((todo) => todo.id);
    const queryParams = recordIds.map((id) => `records[]=${id}`).join("&");
    const deleteURL = `${baseURL}?${queryParams}`;
    try {
      const deleteResponse = await fetch(deleteURL, deleteOptions);

      if (!deleteResponse.ok) {
        setMessage("Failed to delete your tasks");
      }

      setTodoList([]);
    } catch (error) {
      setMessage(`Error clearing all task: ${error}`);
    }
  };
  const handleClearCompleted = async () => {
    try {
      const completedTaskIds = todoList
        .filter((task) => task.completed)
        .map((task) => task.id);

      if (completedTaskIds.length === 0) {
        setMessage("There are no completed tasks to delete.");
        return;
      }
      const queryParams = completedTaskIds
        .map((id) => `records[]=${id}`)
        .join("&");
      const deleteCompletedURL = `${baseURL}?${queryParams}`;
      const deleteCompletedResponse = await fetch(
        deleteCompletedURL,
        deleteOptions
      );
      if (!deleteCompletedResponse.ok) {
        setMessage("Something went wrong while deleting your tasks");
      }
      setTodoList(todoList.filter((task) => !task.completed));
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };

  const handleOrderByName = () => {
    setSortByDate(false); // Turn off date sorting
    setOrder((prevState: boolean) => !prevState);
  };

  const handleOrderByDate = () => {
    setOrder(false); // Turn off name sorting
    setSortByDate((prevState: boolean) => !prevState);
  };
  const completedTasksCount = todoList.filter((todo) => todo.completed).length;

  return (
    <div className="app-container">
      <div className="header">
        <h1>Todo List ✅</h1>
        <AddTodoForm
          onAddTodo={addTodo}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          setMessage={setMessage}
        />
      </div>
      {message && <div className="message-text">{message}</div>}

      <div className="sorting-container">
        <button className="sorting-button by-date" onClick={handleOrderByName}>
          Sort by Name
        </button>
        <button className="sorting-button by-name" onClick={handleOrderByDate}>
          Sort by creation date
        </button>
      </div>
      <div className="task-wrapper">
        {isLoading ? (
          <div className="spinner"></div>
        ) : (
          <TodoList
            setTodoList={setTodoList}
            todoList={todoList}
            onRemoveTodo={removeTodo}
          />
        )}
      </div>
      <div className="task-controls-container">
        <p className="stats">
          Number of Tasks: <strong>{todoList.length}</strong>
        </p>
        <p className="stats">
          Task Completed: <strong>{completedTasksCount}</strong>
        </p>
        <button className="control-button clear-all" onClick={handleClearAll}>
          Clear All
        </button>
        <button
          className="control-button clear-completed"
          onClick={handleClearCompleted}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoListPage;
