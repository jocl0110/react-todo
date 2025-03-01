import React from "react";
import TodoListItem from "./TodoListItem";

export interface Todo {
  id: string;
  title: string;
}

interface TodoListProps {
  todoList: Todo[];
  onRemoveTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todoList, onRemoveTodo }) => {
  return (
    <ul>
      {todoList.map((item: Todo) => {
        return (
          <TodoListItem key={item.id} item={item} onRemoveTodo={onRemoveTodo} />
        );
      })}
    </ul>
  );
};

export default TodoList;
