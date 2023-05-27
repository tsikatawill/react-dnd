import { useEffect, useState } from "react";
import {
  AddTodoForm,
  Container,
  DropContainer,
  Navbar,
  TodoItem,
} from "./components";
import { HandleSubmit } from "./types";
import { useTodos } from "./hooks";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { FinalDrop } from "./components/FinalDrop";
import { TODOS } from "./lib/data";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [editingText, setEditingText] = useState<string>("");

  const { todos, addTodo, editTodo } = useTodos();

  interface Item {
    id: string;
    text: string;
  }

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleTodoSubmit: HandleSubmit = (todo) => {
    addTodo(todo);
  };

  return (
    <MotionConfig>
      <Navbar />

      <main>
        <Container>
          <AddTodoForm handleSubmit={handleTodoSubmit} value={editingText} />
          {/* <AlertContainer type="success" text="Form successfully added" /> */}

          <motion.div className="space-y-5 max-w-2xl mx-auto mt-10">
            {todos.length > 0 && <DropContainer todos={todos} />}

            {todos.length < 1 && (
              <p className="h3 text-center text-slate-400 mt-20">
                You have no todos
              </p>
            )}
          </motion.div>
        </Container>
      </main>

      <div className="my-10 max-w-xl mx-auto"></div>
    </MotionConfig>
  );
}

export default App;
