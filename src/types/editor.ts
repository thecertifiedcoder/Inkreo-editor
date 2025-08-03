import { Editor } from "@tiptap/core";
import { NodeViewProps } from "@tiptap/react";
import { MarkType, NodeType } from "prosemirror-model";

// Editor-related types
export interface EditorOptions {
  openLinkModal: () => void;
}

export interface MediaOptions {
  "media-type"?: "img" | "video";
  src?: string;
  alt?: string;
  title?: string;
  width?: string;
  height?: string;
  dataFloat?: string | null;
  dataAlign?: string;
}

export interface TableOptions {
  HTMLAttributes: Record<string, unknown>;
  resizable: boolean;
  handleWidth: number;
  cellMinWidth: number;
  View: any; // TODO: Replace with proper NodeView type
  lastColumnResizable: boolean;
  allowTableNodeSelection: boolean;
}

export interface LinkOptions {
  HTMLAttributes: Record<string, unknown>;
  validate?: (url: string) => boolean;
  autolink: boolean;
  linkOnPaste: boolean;
  protocols: string[];
  openOnClick: boolean;
  onModKPressed: () => void;
}

export interface PlaceholderOptions {
  emptyEditorClass: string;
  emptyNodeClass: string;
  placeholder: string | ((props: {
    editor: Editor;
    node: any;
    pos: number;
    hasAnchor: boolean;
  }) => string);
  showOnlyWhenEditable: boolean;
  showOnlyCurrent: boolean;
  includeChildren: boolean;
}

// Node view types
export interface ResizableMediaNodeViewProps extends NodeViewProps {
  updateAttributes: (attrs: Partial<MediaOptions>) => void;
  deleteNode: () => void;
}

export interface TableCellNodeViewProps extends NodeViewProps {
  updateAttributes: (attrs: Record<string, unknown>) => void;
}

// Command types
export interface SlashCommandItem {
  title: string;
  command: (params: { editor: Editor; range: any }) => void;
  iconClass: string;
  shortcut: string;
  type: string;
  desc: string;
  highlightedTitle?: string;
}

export interface SlashCommandProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
  editor: Editor;
  range: any;
}

// Utility types
export interface DebounceFunction<T extends (...args: any[]) => any> {
  (this: ThisParameterType<T>, ...args: Parameters<T>): ReturnType<T>;
  cancel(): void;
  flush(): void;
}

// Plugin types
export interface PluginOptions {
  type: MarkType | NodeType;
  validate?: (url: string) => boolean;
}

export interface BubbleMenuOptions {
  shouldShow?: ((props: {
    editor: Editor;
    view: any;
    state: any;
    oldState?: any;
    from: number;
    to: number;
  }) => boolean) | null;
}