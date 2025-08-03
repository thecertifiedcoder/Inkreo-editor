import { defineConfig, UserConfigExport } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// eslint-disable-next-line import/no-unresolved
import Unocss from "unocss/vite";

import { presetIcons } from "unocss";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const config: UserConfigExport = {
    plugins: [
      react(),
      Unocss({
        presets: [
          presetIcons({
            extraProperties: {
              display: "inline-block",
              "vertical-align": "middle",
            },
          }),
        ],
      }),
    ],
    base: "/",
    server: {
      port: 3002,
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks
            'react-vendor': ['react', 'react-dom'],
            'tiptap-core': ['@tiptap/core', '@tiptap/react'],
            'tiptap-extensions': [
              '@tiptap/extension-text',
              '@tiptap/extension-bullet-list',
              '@tiptap/extension-ordered-list',
              '@tiptap/extension-list-item',
              '@tiptap/extension-bold',
              '@tiptap/extension-italic',
              '@tiptap/extension-strike',
              '@tiptap/extension-underline',
              '@tiptap/extension-dropcursor',
              '@tiptap/extension-gapcursor',
              '@tiptap/extension-history',
              '@tiptap/extension-hard-break',
              '@tiptap/extension-heading',
              '@tiptap/extension-link',
              '@tiptap/extension-placeholder',
              '@tiptap/extension-table',
              '@tiptap/extension-table-cell',
              '@tiptap/extension-table-header',
              '@tiptap/extension-table-row',
              '@tiptap/suggestion',
              '@tiptap/starter-kit'
            ],
            'ui-vendor': ['@floating-ui/react-dom-interactions', '@tippyjs/react', 'tippy.js'],
            'utils-vendor': ['lodash', 'classnames', 'fuzzysort'],
            'styling-vendor': ['tailwindcss', 'daisyui', 'unocss'],
            'prosemirror-vendor': ['prosemirror-model', 'prosemirror-state', 'prosemirror-view'],
          },
        },
      },
      chunkSizeWarningLimit: 1000, // Increase limit to 1MB
    },
    optimizeDeps: {
      include: [
        'react',
        'react-dom',
        '@tiptap/core',
        '@tiptap/react',
        'lodash',
        'classnames',
        'fuzzysort'
      ],
    },
  };

  return config;
});
