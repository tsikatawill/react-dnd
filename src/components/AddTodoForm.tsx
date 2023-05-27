import { FC, useState } from "react";
import { Button } from ".";
import { FaPlus } from "react-icons/fa";
import { v4 as uuid } from "uuid";
import { HandleSubmit, Todo } from "../types";
import dayjs from "dayjs";

type AddTodoProps = {
  handleSubmit: HandleSubmit;
  value?: string;
};

export const AddTodoForm: FC<AddTodoProps> = ({ handleSubmit, value }) => {
  const [todoText, setTodoText] = useState<string>(value ? value : "");

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const todo: Todo = {
      id: uuid(),
      title: todoText,
      dateCreated: dayjs().toISOString(),
      completed: false,
    };

    if (todoText.trim() !== "") {
      handleSubmit(todo);
      setTodoText("");
    }
  };

  return (
    <form className="max-w-xl mx-auto mt-10 p-5" onSubmit={onSubmit}>
      <h1 className="h1 text-center mb-2">Add Todo</h1>

      <div className="flex">
        <input
          type="text"
          className="input"
          value={todoText}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setTodoText(e.target.value)
          }
          placeholder="Type todo"
        />
        <Button
          type="submit"
          className="h-10 w-10 grid place-content-center bg-primary hover:bg-primary-hover"
        >
          <FaPlus />
        </Button>
      </div>
    </form>
  );
};
