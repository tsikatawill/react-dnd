import { AddTodoForm, Container, DropContainer, Navbar } from "./components";
import { HandleSubmit } from "./types";
import { useTodos } from "./hooks";
import { MotionConfig, motion } from "framer-motion";

function App() {
  const { todos, addTodo } = useTodos();

  const handleTodoSubmit: HandleSubmit = (todo) => {
    addTodo(todo);
  };

  return (
    <MotionConfig>
      <Navbar />

      <main>
        <Container>
          <AddTodoForm handleSubmit={handleTodoSubmit} />

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
