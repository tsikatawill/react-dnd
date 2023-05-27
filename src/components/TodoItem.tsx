import dayjs from "dayjs";
import { FaCheck, FaPen, FaTrash } from "react-icons/fa";
import { HiX } from "react-icons/hi";
import { Todo } from "../types";
import { ChangeEvent, FC, useState, useEffect, useRef } from "react";
import { MotionProps } from "framer-motion";
import { useTodos } from "../hooks";
import { TodoItemButton } from ".";
import clsx from "clsx";

type TodoItemProps = MotionProps & {
  todo: Todo;
};

export const TodoItem: FC<TodoItemProps> = ({ todo }) => {
  const { deleteTodo, todos, editTodo } = useTodos();
  const [editable, setEditable] = useState(false);
  const [content, setContent] = useState<string>(todo.title);
  const editRef = useRef<HTMLParagraphElement>(null);

  const matchesId: (id: string) => boolean = (id) => {
    const matchedItem = todos.filter((item) => item.id === id)[0];

    return !!matchedItem;
  };

  const handleEdit = () => {
    if (matchesId(todo.id)) {
      if (content.trim() && content !== todo.title) {
        editTodo({ ...todo, title: content });
        window.location.reload();
      }
      setEditable(false);
    } else {
      alert("Todo does not exit");
    }
  };

  const handleDelete = (id: string) => {
    if (matchesId(todo.id)) {
      deleteTodo(id);
      window.location.reload();
    } else {
      alert("Todo does not exit");
    }
  };

  useEffect(() => {
    if (editable) {
      editRef.current?.focus();
    }
  }, [editable]);

  const wrapperStyles = {
    default:
      "w-full bg-white origin-bottom transition-opacity duration-200 dark:bg-transparent-dark border rounded-md flex gap-10 justify-between text-white items-center p-2",
    completed: "border-slate-500",
    notCompleted: "border-primary",
    onDrag: "text-blue-500",
  };

  return (
    <div
      className={clsx(
        wrapperStyles.default,
        todo.completed ? wrapperStyles.completed : wrapperStyles.notCompleted
      )}
    >
      <div className="w-full flex items-center gap-2">
        <input
          type="checkbox"
          checked={todo.completed}
          className="h-5 w-5 opacity-50 hover:opacity-100 transition-all duration-150 ease-out"
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            editTodo({ ...todo, completed: e.target.checked });
            window.location.reload();
          }}
        />

        <div>
          <p
            ref={editRef}
            className={clsx(
              "text-white text-xl w-full focus:border focus:border-slate-500 focus:text-slate-300 focus:pl-2 outline-none",
              todo.completed && "line-through text-slate-500"
            )}
            contentEditable={editable}
            suppressContentEditableWarning
            onBlur={(e: ChangeEvent<HTMLParagraphElement>) => {
              setContent(e.currentTarget.innerHTML);
            }}
            dangerouslySetInnerHTML={{ __html: content }}
          />
          <p className="text-slate-300 text-sm">
            {dayjs(todo.dateCreated).format("DD MMM, YY")}
          </p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        {editable && (
          <>
            <TodoItemButton onClick={handleEdit}>
              <FaCheck />
            </TodoItemButton>
            <TodoItemButton
              onClick={() => {
                setContent(todo.title);
                setEditable(false);
              }}
            >
              <HiX />
            </TodoItemButton>
          </>
        )}

        {!editable && (
          <>
            <TodoItemButton onClick={() => setEditable(true)}>
              <FaPen />
            </TodoItemButton>
            <TodoItemButton
              onClick={() => {
                handleDelete(todo.id);
              }}
            >
              <FaTrash />
            </TodoItemButton>
          </>
        )}
      </div>
    </div>
  );
};
