import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';


interface Todo {
  id: string;
  title: string;
}
interface TodoListPageProps {
  addTodo: (newTodo: Todo) => void;
  removeTodo: (id: string) => void;
  todoList: Todo[];
  isLoading: boolean;
}

const TodoListPage: React.FC<TodoListPageProps> = ({addTodo, removeTodo, todoList, isLoading}) => {
 
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
