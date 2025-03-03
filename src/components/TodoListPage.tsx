import React from "react";
import AddTodoForm from "./AddTodoForm.tsx";
import TodoList from "./TodoList.tsx";
import { Todo } from "./TodoList";

interface TodoListPageProps {
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  todoList: Todo[];
  isLoading: boolean;
  error: boolean;
  setOrder: React.Dispatch<React.SetStateAction<boolean>>;
  setSortByDate: React.Dispatch<React.SetStateAction<boolean>>;
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
}

const TodoListPage: React.FC<TodoListPageProps> = ({
  addTodo,
  removeTodo,
  todoList,
  isLoading,
  setOrder,
  setSortByDate,
  setTodoList,
}) => {
  const handleClearAll = async () => {
    try {
      const baseURL = `https://api.airtable.com/v0/${
        import.meta.env.VITE_AIRTABLE_BASE_ID
      }/${import.meta.env.VITE_TABLE_NAME}`;

      const recordIds = todoList.map((todo) => todo.id);
      const queryParams = recordIds.map((id) => `records[]=${id}`).join("&");
      const deleteURL = `${baseURL}?${queryParams}`;

      const deleteOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
        },
      };

      const deleteResponse = await fetch(deleteURL, deleteOptions);

      if (!deleteResponse.ok) {
        throw new Error("Failed to delete todos");
      }

      // Clear the local state instead of reloading
      setTodoList([]);
    } catch (error) {
      console.error("Error clearing all todos:", error);
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
    <>
      <div>
        <h1 className="header">Todo List</h1>
        <AddTodoForm onAddTodo={addTodo} />
      </div>
      <div>
        <button onClick={handleOrderByName}>Sort by Name</button>
        <button onClick={handleOrderByDate}>Sort by creation date</button>
      </div>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <TodoList
            setTodoList={setTodoList}
            todoList={todoList}
            onRemoveTodo={removeTodo}
          />
        )}
      </div>
      <div>
        <p>Number of Tasks: {todoList.length}</p>
        <p>Task Completed: {completedTasksCount}</p>
        <button onClick={handleClearAll}>Clear All</button>
      </div>
    </>
  );
};

export default TodoListPage;
