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
  const [sortByName, setSortByName] = useState<boolean>(false);
  const [error, setError] = useState(false);

  const fetchData = async () => {
    const url = `https://api.airtable.com/v0/${
      import.meta.env.VITE_AIRTABLE_BASE_ID
    }/${
      import.meta.env.VITE_TABLE_NAME
    }?view=Grid%20view&sort[0][field]=Name&sort[0][direction]=asc`;
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
      console.log(data);

      const sortedTodos = data.records.sort(
        (
          objectA: { fields: { Name: string } },
          objectB: { fields: { Name: string } }
        ) => {
          const titleA = objectA.fields.Name.toLowerCase();
          const titleB = objectB.fields.Name.toLowerCase();
          if (titleA < titleB) return -1;
          if (titleA > titleB) return 1;
          return 0;
        }
      );

      const todos = sortedTodos.map(
        (record: { fields: { Name: string }; id: string }) => ({
          title: record.fields.Name,
          id: record.id,
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
  }, []);

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
