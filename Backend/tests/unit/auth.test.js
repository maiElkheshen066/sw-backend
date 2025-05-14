const authService = require('../../services/auth.service');
const User = require('../../models/User');
const bcrypt = require('bcrypt');
const { generateTokenAndSetCookie } = require('../../utils/jwt.utils');

// npx jest tests/unit/auth.test.js

// Mock dependencies
jest.mock('../../models/User');
jest.mock('bcrypt');
jest.mock('../../utils/jwt.utils');

describe('Auth Service', () => {
  let mockRes;

  beforeEach(() => {
    jest.clearAllMocks();
    mockRes = {
      cookie: jest.fn(),
    };

    // Mock User.findOne to return a query object with a chainable select method
    User.findOne.mockImplementation(() => ({
      select: jest.fn().mockResolvedValue({
        email: 'john@example.com',
        password: 'hashed_password',
      }),
    }));
  });


  describe('createUser', () => {
    it('should create a new user and return token', async () => {
      const mockUserData = {
        firstName: 'John',
        SecondName: 'Doe',
        email: 'john@example.com',
        password: '123456',
        passwordConfirm: '123456',
        role: 'user',
      };

      // Mock findOne to simulate user not found
      User.findOne.mockResolvedValue(null);

      // Mock save method on the User instance
      const mockSave = jest.fn();
      const mockUserInstance = {
        ...mockUserData,
        save: mockSave,
        _id: 'mockUserId',
        email: mockUserData.email,
      };
      User.mockImplementation(() => mockUserInstance);

      // Mock generate token
      generateTokenAndSetCookie.mockReturnValue('mocked-token');

      const result = await authService.createUser(mockUserData, mockRes);

      expect(User.findOne).toHaveBeenCalledWith({ email: mockUserData.email });
      expect(mockSave).toHaveBeenCalled();
      expect(generateTokenAndSetCookie).toHaveBeenCalledWith(mockRes, mockUserInstance);

      expect(result).toEqual({
        id: mockUserInstance._id,
        firstName: mockUserInstance.firstName,
        SecondName:mockUserInstance.SecondName,
        email: mockUserInstance.email,
        role: mockUserData.role,
        accessToken: 'mocked-token',
      });
    });

    it('should throw error if user already exists', async () => {
      User.findOne.mockResolvedValue({ email: 'existing@example.com' });

      await expect(authService.createUser({ email: 'existing@example.com' }, mockRes))
        .rejects
        .toThrow('User already exists');
    });
  });

describe('Auth Service - loginUser', () => {
    it('should login user and return token', async () => {
      bcrypt.compare.mockResolvedValue(true); // Simulate correct password
      generateTokenAndSetCookie.mockReturnValue('mocked-token');

      const result = await authService.loginUser(
        { email: 'john@example.com', password: '123456' },
        mockRes
      );

      expect(User.findOne).toHaveBeenCalledWith({ email: 'john@example.com' });
      expect(bcrypt.compare).toHaveBeenCalledWith('123456', 'hashed_password');
      expect(generateTokenAndSetCookie).toHaveBeenCalledWith(mockRes, {
        email: 'john@example.com',
        password: 'hashed_password',
      });

      expect(result).toEqual({ token: 'mocked-token' });
    });

    it('should throw error if email is missing', async () => {
      await expect(
        authService.loginUser({ email: '', password: 'password' }, mockRes)
      ).rejects.toThrowError(new Error('Please provide email and password 📝'));
    });

    it('should throw error if user not found', async () => {
      User.findOne.mockImplementation(() => ({
        select: jest.fn().mockResolvedValue(null),
      }));

      await expect(
        authService.loginUser({ email: 'notfound@example.com', password: '123456' }, mockRes)
      ).rejects.toThrowError(new Error('Email does not exist'));
    });

    it('should throw error if password is incorrect', async () => {
      bcrypt.compare.mockResolvedValue(false); // Simulate incorrect password

      await expect(
        authService.loginUser({ email: 'john@example.com', password: 'wrongpass' }, mockRes)
      ).rejects.toThrowError(new Error('Incorrect password'));
    });
  });

});
