const { getProfile, updateProfile } = require('../../controllers/profile.controller');
const User = require('../../models/User');

// Mock the User model
jest.mock('../../models/User');

describe('Unit Tests - Profile Controller', () => {
  let req, res;

  beforeEach(() => {
    req = {
      user: { id: '123' },
      body: {}
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    jest.clearAllMocks();
  });

  // -----------------------------
  describe('getProfile()', () => {
    it('should return user data without password', async () => {
      const fakeUser = {
        _id: '123',
        firstName: 'John',
        email: 'john@example.com',
        select: jest.fn().mockResolvedValue({
          _id: '123',
          firstName: 'John',
          email: 'john@example.com',
        }),
      };

      User.findById.mockReturnValue(fakeUser);

      await getProfile(req, res);

      expect(User.findById).toHaveBeenCalledWith('123');
      expect(fakeUser.select).toHaveBeenCalledWith('-password');
      expect(res.json).toHaveBeenCalledWith({
        _id: '123',
        firstName: 'John',
        email: 'john@example.com',
      });
    });

    it('should return 404 if user not found', async () => {
      const fakeUser = {
        select: jest.fn().mockResolvedValue(null),
      };

      User.findById.mockReturnValue(fakeUser);

      await getProfile(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

  });

  // -----------------------------
it('should dynamically update only allowed fields using a string array', async () => {
  const mockUser = {
    firstName: 'Old',
    secondName: 'Old',
    email: 'old@example.com',
    role: 'user',
    gender: 'male',
    mobileNumber: '0000000000',
    save: jest.fn().mockResolvedValue({
      firstName: 'New',
      secondName: 'New',
      email: 'new@example.com',
      role: 'admin',
      gender: 'female',
      mobileNumber: '1234567890'
    })
  };

  req.body = {
    firstName: 'New',
    secondName: 'New',
    email: 'new@example.com',
    role: 'admin',
    gender: 'female',
    mobileNumber: '1234567890',
    notAllowedField: 'ignore me',
  };

  User.findById.mockResolvedValue(mockUser);

  await updateProfile(req, res);

  expect(mockUser.firstName).toBe('New');
  expect(mockUser.SecondName).toBe('New');
  expect(mockUser.email).toBe('new@example.com');
  expect(mockUser.role).toBe('admin');
  expect(mockUser.gender).toBe('female');
  expect(mockUser.mobileNumber).toBe('1234567890');

  // Should not update unknown fields
  expect(mockUser.notAllowedField).toBeUndefined();

  expect(mockUser.save).toHaveBeenCalled();
  expect(res.json).toHaveBeenCalledWith({
    message: 'Profile updated successfully',
    user: await mockUser.save(),
  });
});

});
