import React from 'react';
import AddTodoForm from './components/AddTodoForm';
import TodoList from './components/TodoList';


const TodoListPage = ({addTodo, removeTodo, todoList, isLoading}) => {
 
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
