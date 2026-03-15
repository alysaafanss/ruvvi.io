"use client";

import { useRef, useState, useCallback } from "react";
import { useEditor } from "./EditorProvider";

export default function EditableText({
  section,
  field,
  value,
  tag: Tag = "span",
  className = "",
  children,
}) {
  const editor = useEditor();
  const ref = useRef(null);
  const [editing, setEditing] = useState(false);

  const displayValue = children || value;

  const handleDoubleClick = useCallback(() => {
    if (!editor) return;
    setEditing(true);
    setTimeout(() => {
      if (ref.current) {
        ref.current.focus();
        const range = document.createRange();
        range.selectNodeContents(ref.current);
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }, 0);
  }, [editor]);

  const handleBlur = useCallback(() => {
    setEditing(false);
    if (ref.current && editor) {
      const newValue = ref.current.innerText.trim();
      if (newValue !== value) {
        editor.updateField(section, field, newValue);
      }
    }
  }, [editor, section, field, value]);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Enter" && Tag !== "p") {
        e.preventDefault();
        ref.current?.blur();
      }
      if (e.key === "Escape") {
        if (ref.current) ref.current.innerText = value;
        setEditing(false);
      }
    },
    [Tag, value]
  );

  if (!editor) {
    return <Tag className={className}>{displayValue}</Tag>;
  }

  return (
    <Tag
      ref={ref}
      className={`${className} outline-none transition-all ${
        editing
          ? "ring-2 ring-accent ring-offset-2 rounded-sm"
          : "hover:outline-dashed hover:outline-2 hover:outline-foreground/30 hover:outline-offset-4 hover:rounded-sm cursor-pointer"
      }`}
      contentEditable={editing}
      suppressContentEditableWarning
      onDoubleClick={handleDoubleClick}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
    >
      {displayValue}
    </Tag>
  );
}
