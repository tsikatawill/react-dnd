export type Todo = {
  id: string;
  title: string;
  dateCreated: string;
  completed: boolean;
};

export type HandleSubmit = (todo: Todo) => void;
export type HandleEdit = (todo: Todo) => void;

export type Alerts = "success" | "danger" | "info" | "warn";

export type TodoDragState = "onDrag" | "onOver" | "onDrop";

export type TodoDragStyles = {
  state: TodoDragState;
  styles: string;
};

export type DragItemProps = React.HTMLAttributes<HTMLDivElement> & {
  drag(e: MouseEvent | TouchEvent): void;
  dragEnd(e: MouseEvent | TouchEvent): void;
  dragStart(e: MouseEvent | TouchEvent): void;
};
