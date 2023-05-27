import { Todo, TodoDragStyles } from "../types";

export const getLocalTodos: () => Todo[] = () => {
  const localTodos = JSON.parse(String(localStorage.getItem("todos")));

  if (!localTodos) {
    localStorage.setItem("todos", JSON.stringify([]));
    return [];
  }

  return localTodos;
};

export const updateLocalTodos: (todos: Todo[]) => void = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// const onDragStyles = "bg-red-500 cursor-grab";

// export const dragStyles = {
//   onDrag: onDragStyles,
//   onDrop: onDragStyles,
//   onOver: onDragStyles,
// };
