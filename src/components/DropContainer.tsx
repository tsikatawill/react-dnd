import { useEffect, useRef } from "react";
import { Todo } from "../types";
import { TodoItem } from ".";
import { AnimatePresence, motion } from "framer-motion";

export const DropContainer: React.FC<{ todos: Todo[] }> = ({ todos }) => {
  const listContainerRef = useRef<HTMLDivElement | null>(null);
  const draggableItemRef = useRef<HTMLDivElement | null>(null);
  let items: HTMLElement[] = [];

  useEffect(() => {
    let pointerStartX = 0;
    let pointerStartY = 0;
    let itemsGap = 0;

    const listContainer = listContainerRef.current;
    if (!listContainer) return;

    const dragStart = (e: MouseEvent | TouchEvent) => {
      if (
        e.target instanceof HTMLElement &&
        e.target.classList.contains("drag-handle")
      ) {
        draggableItemRef.current = e.target.closest(".drag-item");
      }
      if (!draggableItemRef.current) return;

      pointerStartX =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      pointerStartY =
        e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;

      setItemsGap();
      disablePageScroll();
      initDraggableItem();
      initItemsState();

      document.addEventListener("mousemove", drag);
      document.addEventListener("touchmove", drag, { passive: false });
    };

    const dragEnd = () => {
      if (!draggableItemRef.current) return;
      applyNewItemsOrder();
      cleanup();
    };

    const setup = () => {
      listContainer.addEventListener("mousedown", dragStart);
      listContainer.addEventListener("touchstart", dragStart);
      document.addEventListener("mouseup", dragEnd);
      document.addEventListener("touchend", dragEnd);
    };

    const setItemsGap = () => {
      const idleItems = getIdleItems();
      if (idleItems.length <= 1) {
        itemsGap = 0;
        return;
      }

      const item1 = idleItems[0];
      const item2 = idleItems[1];
      const item1Rect = item1.getBoundingClientRect();
      const item2Rect = item2.getBoundingClientRect();
      itemsGap = Math.abs(item1Rect.bottom - item2Rect.top);
    };

    const disablePageScroll = () => {
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
      document.body.style.userSelect = "none";
    };

    const initItemsState = () => {
      getIdleItems().forEach((item, i) => {
        if (
          getAllItems().indexOf(draggableItemRef.current as HTMLDivElement) > i
        ) {
          item.dataset.isAbove = "";
        }
      });
    };

    const initDraggableItem = () => {
      const draggableItem = draggableItemRef.current as HTMLDivElement;
      draggableItem.classList.remove("is-idle");
      draggableItem.classList.add("is-draggable");
    };

    const drag = (e: MouseEvent | TouchEvent) => {
      if (!draggableItemRef.current) return;
      e.preventDefault();

      const clientX =
        e instanceof MouseEvent ? e.clientX : e.touches[0].clientX;
      const clientY =
        e instanceof MouseEvent ? e.clientY : e.touches[0].clientY;
      const pointerOffsetX = clientX - pointerStartX;
      const pointerOffsetY = clientY - pointerStartY;

      draggableItemRef.current.style.transform = `translate(${pointerOffsetX}px, ${pointerOffsetY}px)`;
      updateIdleItemsStateAndPosition();
    };

    const updateIdleItemsStateAndPosition = () => {
      const draggableItem = draggableItemRef.current as HTMLDivElement;
      const draggableItemRect = draggableItem.getBoundingClientRect();
      const draggableItemY =
        draggableItemRect.top + draggableItemRect.height / 2;

      getIdleItems().forEach((item) => {
        const itemRect = item.getBoundingClientRect();
        const itemY = itemRect.top + itemRect.height / 2;

        if (isItemAbove(item)) {
          if (draggableItemY <= itemY) {
            item.dataset.isToggled = "";
          } else {
            delete item.dataset.isToggled;
          }
        } else {
          if (draggableItemY >= itemY) {
            item.dataset.isToggled = "";
          } else {
            delete item.dataset.isToggled;
          }
        }
      });

      getIdleItems().forEach((item) => {
        if (isItemToggled(item)) {
          const direction = isItemAbove(item) ? 1 : -1;
          item.style.transform = `translateY(${
            direction * (draggableItemRect.height + itemsGap)
          }px)`;
        } else {
          item.style.transform = "";
        }
      });
    };

    const applyNewItemsOrder = () => {
      const reorderedItems: HTMLElement[] = [];
      getAllItems().forEach((item, index) => {
        if (item === draggableItemRef.current) {
          return;
        }
        if (!isItemToggled(item)) {
          reorderedItems[index] = item;
          return;
        }
        const newIndex = isItemAbove(item) ? index + 1 : index - 1;
        reorderedItems[newIndex] = item;
      });

      for (let index = 0; index < getAllItems().length; index++) {
        const item = reorderedItems[index];
        if (typeof item === "undefined") {
          reorderedItems[index] = draggableItemRef.current as HTMLDivElement;
        }
      }

      reorderedItems.forEach((item) => {
        listContainer.appendChild(item);
      });
    };

    const cleanup = () => {
      itemsGap = 0;
      items = [];
      unsetDraggableItem();
      unsetItemState();
      enablePageScroll();
      document.removeEventListener("mousemove", drag);
      document.removeEventListener("touchmove", drag);
    };

    const unsetDraggableItem = () => {
      const draggableItem = draggableItemRef.current as HTMLDivElement;
      draggableItem.style.transform = "";
      draggableItem.classList.remove("is-draggable");
      draggableItem.classList.add("is-idle");
      draggableItemRef.current = null;
    };

    const unsetItemState = () => {
      getIdleItems().forEach((item) => {
        delete item.dataset.isAbove;
        delete item.dataset.isToggled;
        item.style.transform = "";
      });
    };

    const enablePageScroll = () => {
      document.body.style.overflow = "";
      document.body.style.touchAction = "";
      document.body.style.userSelect = "";
    };

    setup();
  }, []);

  const getAllItems = () => {
    if (!items.length) {
      items = Array.from(
        (listContainerRef.current as HTMLDivElement).querySelectorAll(
          ".drag-item"
        )
      ) as HTMLElement[];
    }
    return items;
  };

  const getIdleItems = () => {
    return getAllItems().filter((item) => item.classList.contains("is-idle"));
  };

  const isItemAbove = (item: HTMLElement) => {
    return item.hasAttribute("data-is-above");
  };

  const isItemToggled = (item: HTMLElement) => {
    return item.hasAttribute("data-is-toggled");
  };

  return (
    <div
      ref={listContainerRef}
      className="js-list space-y-2 max-w-xl mx-auto mt-10"
    >
      <AnimatePresence initial={false}>
        {todos.map((todo) => (
          <motion.div
            initial={{ scale: 0 }}
            animate={{
              scale: 1,
              transition: {
                type: "spring",
                duration: 0.02,
              },
            }}
            key={todo.id}
            className="is-idle drag-item relative"
          >
            <TodoItem todo={todo} />
            <span className="drag-handle absolute -right-6 w-6 bg-slate-600 top-0 bottom-0 grid place-content-center text-3xl opacity-50 hover:opacity-100 duration-100">
              ⠿
            </span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
