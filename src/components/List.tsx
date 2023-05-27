import { useState } from "react";

export const List = () => {
  const [items, setItems] = useState(["Item 1", "Item 2", "Item 3"]);
  const [dragIndex, setDragIndex] = useState<number | null>(null);

  const handleDragStart = (index: number) => {
    setDragIndex(index);
  };

  const handleDragOver = (index: number) => {
    if (dragIndex !== index) {
      const newItems = [...items];
      const draggedItem = newItems[dragIndex as number];

      newItems.splice(dragIndex as number, 1);
      newItems.splice(index, 0, draggedItem);

      setItems(newItems);
      setDragIndex(index);
    }
  };

  return (
    <ul className="max-w-3xl mx-auto mt-20 bg-purple-900 text-white p-5 rounded-md">
      {items.map((item, index) => (
        <li
          className="p-5 mb-5 bg-[rgba(0,0,0,0.25)] rounded-md"
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => setDragIndex(null)}
          onDragOver={() => handleDragOver(index)}
        >
          {item}
        </li>
      ))}
    </ul>
  );
};
