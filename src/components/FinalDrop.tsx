import clsx from "clsx";
import { useRef, useState } from "react";
import { Todo } from "../types";

export const FinalDrop = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggableItem, setDraggableItem] = useState<number>();
  const [dragId, setDragId] = useState<string>("");
  const dragRef = useRef<HTMLDivElement>(null);

  let pointerStartX: number;
  let pointerStartY: number;

  //   Drag Start
  const dragStart = (e: React.MouseEvent<HTMLSpanElement>, index: number) => {
    console.log("Drag start");
    setIsDragging(true);

    pointerStartX = e.clientX;
    pointerStartY = e.clientY;

    // Get draggableItem
    const draggable = LIST[index];
    if (!draggable.id) return;
    setDraggableItem(index);
    setDragId(String(index));
  };

  //   Drag
  const drag = (e: React.MouseEvent<HTMLSpanElement>) => {
    console.log("Dragging");

    const currentPositionX = e.clientX;
    const currentPositionY = e.clientY;

    const pointerOffsetX = currentPositionX - pointerStartX;
    const pointerOffsetY = currentPositionY - pointerStartY;

    if (dragRef.current)
      dragRef.current.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`;
  };

  //   Drag End
  const dragEnd = (e: React.MouseEvent<HTMLSpanElement>) => {
    setIsDragging(false);
  };

  const LIST: Todo[] = [
    { id: "5", dateCreated: "25", completed: false, title: "🍦 Ice cream" },
    { id: "25", dateCreated: "25", completed: false, title: "🥞 Pancake" },
    { id: "35", dateCreated: "25", completed: false, title: "🧇 Waffle" },
    { id: "55", dateCreated: "25", completed: false, title: "🍰 Cake " },
  ];
  return (
    <div className="max-w-md mx-auto space-y-2 will-change-transform">
      {LIST.map((todo, index) => (
        <div
          ref={draggableItem === index ? dragRef : null}
          className="flex justify-between p-2 bg-slate-600"
          id={`drag-${index}`}
        >
          {todo.title}

          <span
            className={clsx(isDragging ? "cursor-grab" : "cursor-grab")}
            onMouseDown={(e) => dragStart(e, index)}
            onMouseMove={(e) => isDragging && drag(e)}
            onMouseUp={dragEnd}
          >
            ⠿
          </span>
        </div>
      ))}
    </div>
  );
};
