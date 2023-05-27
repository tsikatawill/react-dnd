import React, { useState } from "react";
import { motion } from "framer-motion";
import clsx from "clsx";

const List = () => {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    "Four",
    "Five",
    "Six",
  ]);
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
    <ul>
      {items.map((item, index) => (
        <motion.li
          className="text-lg mb-2 p-2 bg-slate-600"
          key={index}
          draggable
          aria-dropeffect="move"
          onDragStart={() => handleDragStart(index)}
          onDragEnd={() => {
            setDragIndex(null);
          }}
          onDragOver={() => {
            handleDragOver(index);
          }}
          animate={{ x: 0 }}
          // whileHover={{ scale: 1.1 }}
          // whileTap={{ scale: 0.9 }}
          style={{ cursor: "grab" }}
        >
          {item}
        </motion.li>
      ))}
    </ul>
  );
};

export default List;
