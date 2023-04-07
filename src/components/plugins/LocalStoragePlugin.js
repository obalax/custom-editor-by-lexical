import { useCallback, useEffect } from "react";
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext";
import { debounce } from "../utils";

export default function LocalStoragePlugin({ namespace }) {
    const [editor] = useLexicalComposerContext();

    const saveContent = useCallback(
        (content) => {
            console.log("content", content);
            localStorage.setItem(namespace, content);
        },
        [namespace]
    );

    const debouncedSaveContent = debounce(saveContent, 10);

    useEffect(() => {
        return editor.registerUpdateListener(
            ({ editorState, dirtyElements, dirtyLeaves }) => {
                console.log("editorState", JSON.stringify(editorState));
                // Don't update if nothing changed
                if (dirtyElements.size === 0 && dirtyLeaves.size === 0) return;

                const serializedState = JSON.stringify(editorState);
                debouncedSaveContent(serializedState);
            }
        );
    }, [debouncedSaveContent, editor]);

    return null;
}
