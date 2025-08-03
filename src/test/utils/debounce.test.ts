import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { debounce } from '../../tiptap/utils/debounce';

describe('debounce utility', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should debounce function calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    // Call the function multiple times
    debouncedFn();
    debouncedFn();
    debouncedFn();

    // Function should not be called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast forward time
    vi.advanceTimersByTime(100);

    // Function should be called only once
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should pass arguments correctly', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('test', 123);
    vi.advanceTimersByTime(100);

    expect(mockFn).toHaveBeenCalledWith('test', 123);
  });

  it('should handle multiple calls with different arguments', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn('first');
    debouncedFn('second');
    debouncedFn('third');

    vi.advanceTimersByTime(100);

    // Should only call with the last arguments
    expect(mockFn).toHaveBeenCalledWith('third');
    expect(mockFn).toHaveBeenCalledTimes(1);
  });

  it('should reset timer on new calls', () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 100);

    debouncedFn();
    
    // Advance time but not enough to trigger
    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    // Call again, should reset timer
    debouncedFn();
    vi.advanceTimersByTime(50);
    expect(mockFn).not.toHaveBeenCalled();

    // Advance the full time
    vi.advanceTimersByTime(50);
    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});