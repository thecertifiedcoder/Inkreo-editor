import { Extension } from "@tiptap/core";
import Suggestion from "@tiptap/suggestion";

export const Commands = Extension.create({
  name: "slash-commands",

  addOptions() {
    return {
      suggestions: {
        char: "/",
        command: ({ editor, range, props }: { 
          editor: any; 
          range: any; 
          props: { command: (params: { editor: any; range: any }) => void } 
        }) =>
          props.command({ editor, range }),
      },
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestions,
      }),
    ];
  },
});
