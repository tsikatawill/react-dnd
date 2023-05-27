import { ChangeEvent, useState } from "react";

export const ContentEditable = () => {
  const [content, setContent] = useState("");

  return (
    <p
      className="text-white text-xl w-full focus:border focus:border-slate-500 focus:text-slate-300 focus:pl-2 outline-none"
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: ChangeEvent<HTMLParagraphElement>) => {
        setContent(e.currentTarget.innerHTML);
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};
