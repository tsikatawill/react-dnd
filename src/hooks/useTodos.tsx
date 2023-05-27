import { useState } from "react";
import { Todo } from "../types";
import { getLocalTodos, updateLocalTodos } from "../utils";

export const useTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(getLocalTodos());

  const addTodo = (todo: Todo) => {
    const newTodos = [todo, ...todos];

    updateLocalTodos(newTodos);
    setTodos(newTodos);
  };

  const editTodo = (todo: Todo) => {
    const newTodos = getLocalTodos().filter((item) => item.id !== todo.id);

    updateLocalTodos([todo, ...newTodos]);
    setTodos([todo, ...newTodos]);
  };

  const deleteTodo = (id: string) => {
    const newTodos = getLocalTodos().filter((item) => item.id !== id);

    updateLocalTodos(newTodos);
    setTodos(newTodos);
  };

  return { todos, addTodo, deleteTodo, editTodo };
};
