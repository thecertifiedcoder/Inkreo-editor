import { DebounceFunction } from "../../types/editor";

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): DebounceFunction<T> {
  let h: NodeJS.Timeout;

  const callable = (...args: Parameters<T>) => {
    clearTimeout(h);
    h = setTimeout(() => func(...args), wait);
  };

  return callable as DebounceFunction<T>;
}
