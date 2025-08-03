import { describe, it, expect } from 'vitest';
import type { 
  EditorOptions, 
  MediaOptions, 
  TableOptions, 
  LinkOptions, 
  PlaceholderOptions,
  SlashCommandItem,
  DebounceFunction
} from '../../types/editor';

describe('Type Definitions', () => {
  describe('EditorOptions', () => {
    it('should have correct structure', () => {
      const options: EditorOptions = {
        openLinkModal: () => {},
      };

      expect(typeof options.openLinkModal).toBe('function');
    });
  });

  describe('MediaOptions', () => {
    it('should accept valid media options', () => {
      const mediaOptions: MediaOptions = {
        'media-type': 'img',
        src: 'https://example.com/image.jpg',
        alt: 'Example image',
        title: 'Example title',
        width: '800',
        height: '600',
        dataFloat: 'left',
        dataAlign: 'center',
      };

      expect(mediaOptions['media-type']).toBe('img');
      expect(mediaOptions.src).toBe('https://example.com/image.jpg');
    });

    it('should accept video media options', () => {
      const videoOptions: MediaOptions = {
        'media-type': 'video',
        src: 'https://example.com/video.mp4',
        width: '800',
        height: '600',
      };

      expect(videoOptions['media-type']).toBe('video');
    });
  });

  describe('TableOptions', () => {
    it('should have correct structure', () => {
      const tableOptions: TableOptions = {
        HTMLAttributes: {},
        resizable: true,
        handleWidth: 5,
        cellMinWidth: 25,
        View: {} as any,
        lastColumnResizable: true,
        allowTableNodeSelection: false,
      };

      expect(tableOptions.resizable).toBe(true);
      expect(tableOptions.handleWidth).toBe(5);
      expect(tableOptions.cellMinWidth).toBe(25);
    });
  });

  describe('LinkOptions', () => {
    it('should have correct structure', () => {
      const linkOptions: LinkOptions = {
        HTMLAttributes: {},
        validate: (url: string) => url.startsWith('http'),
        autolink: true,
        linkOnPaste: true,
        protocols: ['http', 'https'],
        openOnClick: true,
        onModKPressed: () => {},
      };

      expect(linkOptions.autolink).toBe(true);
      expect(linkOptions.linkOnPaste).toBe(true);
      expect(linkOptions.protocols).toEqual(['http', 'https']);
    });
  });

  describe('PlaceholderOptions', () => {
    it('should have correct structure', () => {
      const placeholderOptions: PlaceholderOptions = {
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        placeholder: 'Type something...',
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: false,
      };

      expect(placeholderOptions.emptyEditorClass).toBe('is-editor-empty');
      expect(placeholderOptions.placeholder).toBe('Type something...');
    });

    it('should accept function placeholder', () => {
      const placeholderOptions: PlaceholderOptions = {
        emptyEditorClass: 'is-editor-empty',
        emptyNodeClass: 'is-empty',
        placeholder: ({ editor, node, pos, hasAnchor }) => {
          return `Type at position ${pos}`;
        },
        showOnlyWhenEditable: true,
        showOnlyCurrent: true,
        includeChildren: false,
      };

      expect(typeof placeholderOptions.placeholder).toBe('function');
    });
  });

  describe('SlashCommandItem', () => {
    it('should have correct structure', () => {
      const commandItem: SlashCommandItem = {
        title: 'Heading 1',
        command: ({ editor, range }) => {
          editor.chain().focus().setNode('heading', { level: 1 }).run();
        },
        iconClass: 'i-ri-h1',
        shortcut: '#',
        type: 'heading',
        desc: 'Add a heading',
        highlightedTitle: '<b>Heading</b> 1',
      };

      expect(commandItem.title).toBe('Heading 1');
      expect(commandItem.shortcut).toBe('#');
      expect(commandItem.iconClass).toBe('i-ri-h1');
    });
  });

  describe('DebounceFunction', () => {
    it('should have correct structure', () => {
      const mockFn = (a: string, b: number) => `${a}-${b}`;
      const debouncedFn: DebounceFunction<typeof mockFn> = (a: string, b: number) => {
        return `${a}-${b}`;
      };

      debouncedFn.cancel = () => {};
      debouncedFn.flush = () => {};

      expect(typeof debouncedFn).toBe('function');
      expect(typeof debouncedFn.cancel).toBe('function');
      expect(typeof debouncedFn.flush).toBe('function');
    });
  });
});