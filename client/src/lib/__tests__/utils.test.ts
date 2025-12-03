/**
 * Unit tests for utility functions
 */

import { cn, debounce, formatDate, slugify, truncate } from '../utils';

describe('Utility Functions', () => {
  describe('cn (className merger)', () => {
    it('should merge class names correctly', () => {
      const result = cn('btn', 'btn-primary', 'text-white');
      expect(result).toContain('btn');
      expect(result).toContain('btn-primary');
      expect(result).toContain('text-white');
    });

    it('should handle conditional classes', () => {
      const result = cn('btn', false && 'hidden', 'active');
      expect(result).not.toContain('hidden');
      expect(result).toContain('active');
    });

    it('should handle undefined and null values', () => {
      const result = cn('btn', undefined, null, 'active');
      expect(result).toContain('btn');
      expect(result).toContain('active');
    });
  });

  describe('formatDate', () => {
    it('should format ISO date string correctly', () => {
      const date = '2024-03-15T10:30:00Z';
      const result = formatDate(date);
      expect(result).toMatch(/Mar|March/);
      expect(result).toContain('15');
      expect(result).toContain('2024');
    });

    it('should handle invalid dates gracefully', () => {
      const result = formatDate('invalid-date');
      expect(result).toBe('Invalid Date');
    });

    it('should format Date objects', () => {
      const date = new Date('2024-03-15');
      const result = formatDate(date);
      expect(result).toBeTruthy();
    });
  });

  describe('truncate', () => {
    it('should truncate long strings', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncate(longText, 20);
      expect(result.length).toBeLessThanOrEqual(23); // 20 + '...'
      expect(result).toContain('...');
    });

    it('should not truncate short strings', () => {
      const shortText = 'Short text';
      const result = truncate(shortText, 20);
      expect(result).toBe(shortText);
      expect(result).not.toContain('...');
    });

    it('should handle exact length', () => {
      const text = 'Exactly twenty chars';
      const result = truncate(text, 20);
      expect(result).toBe(text);
    });
  });

  describe('slugify', () => {
    it('should convert text to URL-friendly slug', () => {
      const result = slugify('Hello World');
      expect(result).toBe('hello-world');
    });

    it('should handle special characters', () => {
      const result = slugify('Hello, World! How are you?');
      expect(result).toBe('hello-world-how-are-you');
    });

    it('should handle multiple spaces', () => {
      const result = slugify('Hello    World');
      expect(result).toBe('hello-world');
    });

    it('should handle uppercase', () => {
      const result = slugify('HELLO WORLD');
      expect(result).toBe('hello-world');
    });

    it('should remove leading/trailing dashes', () => {
      const result = slugify('  Hello World  ');
      expect(result).not.toMatch(/^-|-$/);
    });
  });

  describe('debounce', () => {
    jest.useFakeTimers();

    it('should delay function execution', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      expect(mockFn).not.toHaveBeenCalled();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should cancel previous calls', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn();
      debouncedFn();
      debouncedFn();

      jest.advanceTimersByTime(1000);
      expect(mockFn).toHaveBeenCalledTimes(1);
    });

    it('should pass arguments correctly', () => {
      const mockFn = jest.fn();
      const debouncedFn = debounce(mockFn, 1000);

      debouncedFn('test', 123);
      jest.advanceTimersByTime(1000);

      expect(mockFn).toHaveBeenCalledWith('test', 123);
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });
});
