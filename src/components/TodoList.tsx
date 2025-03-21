import React from "react";
import TodoListItem from "./TodoListItem";

export interface Todo {
  id: string;
  title: string;
  createdTime: string;
  completed: boolean;
}

interface TodoListProps {
  todoList: Todo[];
  setTodoList: React.Dispatch<React.SetStateAction<Todo[]>>;
  onRemoveTodo: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todoList,
  onRemoveTodo,
  setTodoList,
}) => {
  return (
    <ul>
      {todoList.map((item: Todo, index) => {
        return (
          <TodoListItem
            todoList={todoList}
            setTodoList={setTodoList}
            key={item.id}
            item={item}
            index={index}
            onRemoveTodo={onRemoveTodo}
          />
        );
      })}
    </ul>
  );
};

export default TodoList;
