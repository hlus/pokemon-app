import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useDebounce } from '../useDebounce';

interface Props {
  value: string;
}

describe('useDebounce', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 500));
    expect(result.current).toBe('initial');
  });

  it('debounces value changes', () => {
    const { result, rerender } = renderHook<string, Props>(({ value }) => useDebounce(value, 500), { initialProps: { value: 'initial' } });

    rerender({ value: 'changed' });
    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(result.current).toBe('changed');
  });

  it('cancels previous timeout on new value', () => {
    const { result, rerender } = renderHook<string, Props>(({ value }) => useDebounce(value, 500), { initialProps: { value: 'initial' } });

    rerender({ value: 'changed1' });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    rerender({ value: 'changed2' });

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe('initial');

    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(result.current).toBe('changed2');
  });
});
