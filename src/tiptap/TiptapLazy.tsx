import { lazy, Suspense } from "react";

// Lazy load the main Tiptap component
const Tiptap = lazy(() => import("./Tiptap").then(module => ({ default: module.Tiptap })));

// Loading component
const TiptapLoading = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    <span className="ml-2 text-gray-600">Loading editor...</span>
  </div>
);

// Error boundary component
const TiptapError = ({ error }: { error: Error }) => (
  <div className="flex items-center justify-center p-8 text-red-600">
    <div className="text-center">
      <div className="text-xl font-semibold mb-2">Editor failed to load</div>
      <div className="text-sm">{error.message}</div>
    </div>
  </div>
);

// Lazy-loaded Tiptap wrapper
export const TiptapLazy = () => {
  return (
    <Suspense fallback={<TiptapLoading />}>
      <Tiptap />
    </Suspense>
  );
};