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
  const [sortByDate, setSortByDate] = useState<boolean>(false);
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
      console.log(data);

      let todos = data.records.map(
        (task: {
          id: string;
          createdTime: string;
          fields: { Name: string; completed: boolean };
        }) => ({
          title: task.fields.Name,
          id: task.id,
          createdTime: task.createdTime,
          completed: false,
        })
      );

      if (sortByDate) {
        todos = todos.sort((a: Todo, b: Todo) => {
          return (
            new Date(a.createdTime).getTime() -
            new Date(b.createdTime).getTime()
          );
        });
      }

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
  }, [order, sortByDate]);

  useEffect(() => {
    if (isLoading === false) {
      localStorage.setItem("savedTodoList", JSON.stringify(todoList));
    }
  }, [todoList]);

  const addTodo = (newTodo: Todo) => {
    setTodoList([...todoList, newTodo]);
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
              setSortByDate={setSortByDate}
              setTodoList={setTodoList}
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
