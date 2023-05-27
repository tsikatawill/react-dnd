import { v4 as uuid } from "uuid";
import { Todo } from "../types";

export const TODOS: Todo[] = [
  {
    id: uuid(),
    title: "Buy groceries for dinner",
    dateCreated: "2023-05-11T16:45:16.306Z",
    completed: false,
  },
  {
    id: uuid(),
    title: "Take out the trash",
    dateCreated: "2023-05-09T16:45:16.306Z",
    completed: true,
  },
  {
    id: uuid(),
    title: "Pay bills",
    dateCreated: "2023-05-07T16:45:16.306Z",
    completed: false,
  },
  {
    id: uuid(),
    title: "Finish writing report",
    dateCreated: "2023-05-06T16:45:16.306Z",
    completed: false,
  },
  {
    id: uuid(),
    title: "Read a chapter of a book",
    dateCreated: "2023-05-05T16:45:16.306Z",
    completed: true,
  },
  {
    id: uuid(),
    title: "Exercise for 30 minutes",
    dateCreated: "2023-05-05T16:45:16.306Z",
    completed: false,
  },
  {
    id: uuid(),
    title: "Clean the bathroom",
    dateCreated: "2023-05-04T16:45:16.306Z",
    completed: true,
  },
  {
    id: uuid(),
    title: "Go for a walk in the park",
    dateCreated: "2023-05-01T16:45:16.306Z",
    completed: false,
  },
  {
    id: uuid(),
    title: "Attend a meeting with team members",
    dateCreated: "2023-04-20T16:45:16.306Z",
    completed: true,
  },
  {
    id: uuid(),
    title: "Learn a new programming language",
    dateCreated: "2023-04-20T16:45:16.306Z",
    completed: false,
  },
];
