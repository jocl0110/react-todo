import React from 'react';
import AddTodoForm from './AddTodoForm.tsx';
import TodoList from './TodoList.tsx';


interface Todo {
  id: string;
  title: string;
}
interface TodoListPageProps {
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  todoList: Todo[];
  isLoading: boolean;
  error: boolean;
}

const TodoListPage: React.FC<TodoListPageProps> = ({addTodo, removeTodo, todoList, isLoading, error}) => {

    const handleReload = () => {
      window.location.reload()
    }
    
    if(error) {
      return <div>
          <p>Something went wrong</p>
          <button onClick={handleReload}>Reload</button>
      </div>
    }
  return (
    <>
      <h1 className='header'>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </>
  );
}



export default TodoListPage;
