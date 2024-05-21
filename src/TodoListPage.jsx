import React from 'react';
import AddTodoForm from './AddTodoForm';
import TodoList from './TodoList';


const TodoListPage = ({addTodo, removeTodo, todoList, isLoading}) => {
 
  return (
    <div>
      <h1>Todo List</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
      )}
    </div>
  );
}

export default TodoListPage;
