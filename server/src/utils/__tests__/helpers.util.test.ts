import { addDays, catchAsync } from '../helpers.util';

describe('Helpers Utility', () => {
  describe('addDays', () => {
    it('should add days to a date', () => {
      const date = new Date('2025-01-01');
      const result = addDays(date, 5);
      expect(result.getDate()).toBe(6);
    });

    it('should handle adding 0 days', () => {
      const date = new Date('2025-01-15');
      const result = addDays(date, 0);
      expect(result.getDate()).toBe(15);
    });

    it('should handle month transitions', () => {
      const date = new Date('2025-01-30');
      const result = addDays(date, 3);
      expect(result.getMonth()).toBe(1); // February
      expect(result.getDate()).toBe(2);
    });
  });

  describe('catchAsync', () => {
    it('should call the wrapped function', async () => {
      const mockReq = {} as any;
      const mockRes = {} as any;
      const mockNext = jest.fn();
      const mockFn = jest.fn().mockResolvedValue('success');

      const wrappedFn = catchAsync(mockFn);
      await wrappedFn(mockReq, mockRes, mockNext);

      expect(mockFn).toHaveBeenCalledWith(mockReq, mockRes, mockNext);
    });

    it('should catch errors and pass to next', async () => {
      const mockReq = {} as any;
      const mockRes = {} as any;
      const mockNext = jest.fn();
      const error = new Error('Test error');
      const mockFn = jest.fn().mockRejectedValue(error);

      const wrappedFn = catchAsync(mockFn);
      await wrappedFn(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(error);
    });
  });
});
