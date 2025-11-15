import { Response } from 'express';
import { sendResponse } from '../response.util';

describe('Response Utility', () => {
  describe('sendResponse', () => {
    let mockRes: Partial<Response>;

    beforeEach(() => {
      mockRes = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };
    });

    it('should send success response with data', () => {
      const responseData = {
        statusCode: 200,
        success: true,
        message: 'Success',
        data: { id: '1', name: 'Test' },
      };

      sendResponse(mockRes as Response, responseData);

      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        statusCode: 200,
        message: 'Success',
        data: { id: '1', name: 'Test' },
      });
    });

    it('should send response without data', () => {
      const responseData = {
        statusCode: 204,
        success: true,
        message: 'Deleted successfully',
      };

      sendResponse(mockRes as Response, responseData);

      expect(mockRes.status).toHaveBeenCalledWith(204);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        statusCode: 204,
        message: 'Deleted successfully',
      });
    });

    it('should handle meta information', () => {
      const responseData = {
        statusCode: 200,
        success: true,
        message: 'Projects retrieved',
        data: [],
        meta: {
          page: 1,
          limit: 10,
          total: 0,
        },
      };

      sendResponse(mockRes as Response, responseData);

      expect(mockRes.json).toHaveBeenCalledWith(responseData);
    });
  });
});
