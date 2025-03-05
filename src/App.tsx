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
  const [message, setMessage] = useState<string>("");

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
      const data = await response.json();

      let todos = data.records.map(
        (task: {
          id: string;
          createdTime: string;
          fields: { Name: string; completed: boolean };
        }) => ({
          title: task.fields.Name,
          id: task.id,
          createdTime: task.createdTime,
          completed: task.fields.completed,
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
      setMessage(`Something went wrong ${error}`);
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

    if (message) {
      setTimeout(() => {
        setMessage("");
      }, 3000);
    }
  }, [todoList, message]);

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
        setMessage("Something happened while deleting a task");
      }
      const newTodoList = todoList.filter((todo) => todo.id !== id);
      setTodoList(newTodoList);
    } catch (error) {
      setMessage(`Something happened while deleting a task ${error}`);
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
              setIsLoading={setIsLoading}
              addTodo={addTodo}
              removeTodo={removeTodo}
              message={message}
              setMessage={setMessage}
            />
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
