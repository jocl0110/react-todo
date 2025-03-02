import React, { useEffect, useState } from "react";
import "./App.css";
import "./components/TodoList";
import "./components/AddTodoForm";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import TodoListPage from "./components/TodoListPage";
import { Todo } from "./components/TodoList";

const App = (): JSX.Element => {
  const [todoList, setTodoList] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [order, setOrder] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=${
      order ? "asc" : "desc"
    }`;
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };
    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error :${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      const todos = data.records.map(
        (task: {
          id: string;
          createdTime: string;
          fields: { Name: string };
        }) => ({
          title: task.fields.Name,
          id: task.id,
          createdTime: task.createdTime,
        })
      );

      setTodoList(todos);
    } catch (error) {
      console.error("Error:", (error as Error).message);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [order]);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo: Todo) => {
    const _newTodoList = [...todoList, newTodo].sort((a, b) => {
      const titleA = a.title.toLowerCase();
      const titleB = b.title.toLowerCase();
      if (titleA < titleB) return -1;
      if (titleA > titleB) return 1;
      return 0;
    });
    setTodoList(_newTodoList);
  };

  const removeTodo = async (id: string) => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${import.meta.env.VITE_TABLE_NAME}/${id}`;
    const options = {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_AIRTABLE_API_TOKEN}`,
      },
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        const message = `Error ${response.status}`;
        throw new Error(message);
      }
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    } catch (error) {
      console.error("Error:", (error as Error).message);
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <TodoListPage
              setOrder={setOrder}
              todoList={todoList}
              isLoading={isLoading}
              addTodo={addTodo}
              removeTodo={removeTodo}
              error={error}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
