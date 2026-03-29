"use client";

import { createContext, useContext, useState, useCallback, useRef } from "react";
import { saveBulkContentAction } from "@/app/admin/content-actions";
import { logout } from "@/app/admin/login/actions";
import { DEFAULTS } from "@/lib/content-defaults";

const EditorContext = createContext(null);

export function useEditor() {
  return useContext(EditorContext);
}

export default function EditorProvider({ children, initialContent = {} }) {
  const [changes, setChanges] = useState({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const hasChanges = Object.keys(changes).length > 0;

  const contentRef = useRef(initialContent);

  const getContent = useCallback(
    (sectionId) => {
      const base = initialContent[sectionId] || DEFAULTS[sectionId] || {};
      const overrides = changes[sectionId] || {};
      return { ...base, ...overrides };
    },
    [initialContent, changes]
  );

  const updateField = useCallback((sectionId, field, value) => {
    setChanges((prev) => {
      const section = prev[sectionId] || {};
      const currentContent =
        contentRef.current[sectionId] || DEFAULTS[sectionId] || {};
      return {
        ...prev,
        [sectionId]: { ...currentContent, ...section, [field]: value },
      };
    });
    setSaved(false);
  }, []);

  const save = useCallback(async () => {
    if (!hasChanges) return;
    setSaving(true);
    const result = await saveBulkContentAction(changes);
    setSaving(false);
    if (result.error) {
      alert(`Save failed: ${result.error}`);
    } else {
      contentRef.current = {
        ...contentRef.current,
        ...Object.fromEntries(
          Object.entries(changes).map(([k, v]) => [
            k,
            { ...(contentRef.current[k] || {}), ...v },
          ])
        ),
      };
      setChanges({});
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  }, [changes, hasChanges]);

  const discard = useCallback(() => {
    setChanges({});
  }, []);

  return (
    <EditorContext.Provider
      value={{ isEditing: true, getContent, updateField, changes }}
    >
      {children}

      <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2">
        <div className="flex items-center gap-3 rounded-full bg-foreground px-4 py-2.5 shadow-2xl sm:px-6 sm:py-3">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-accent animate-pulse" />
            <span className="hidden text-xs font-medium text-white/70 sm:block">
              Editor Mode
            </span>
          </div>

          {hasChanges && (
            <>
              <div className="h-4 w-px bg-white/20" />
              <button
                onClick={discard}
                className="text-xs font-medium text-white/60 hover:text-white transition-colors"
              >
                Discard
              </button>
              <button
                onClick={save}
                disabled={saving}
                className="rounded-full bg-accent px-5 py-1.5 text-xs font-bold text-foreground transition-all hover:bg-accent-dark disabled:opacity-50"
              >
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}

          {saved && (
            <>
              <div className="h-4 w-px bg-white/20" />
              <span className="text-xs font-medium text-accent">Saved</span>
            </>
          )}

          <div className="h-4 w-px bg-white/20" />
          <a
            href="/admin/media"
            className="text-xs font-medium text-white/60 hover:text-white transition-colors"
          >
            Media
          </a>
          <div className="h-4 w-px bg-white/20" />
          <form action={logout} className="flex">
            <button
              type="submit"
              className="text-xs font-medium text-white/60 hover:text-red-400 transition-colors"
            >
              Logout
            </button>
          </form>
        </div>
      </div>
    </EditorContext.Provider>
  );
}
