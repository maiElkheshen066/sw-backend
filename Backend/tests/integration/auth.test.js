const request = require("supertest");
const mongoose = require("mongoose");
const crypto = require("crypto");
const app = require("../../app"); // Your Express app
const User = require("../../models/User"); // Your User model
// TODO  npx jest tests/integration/auth.test

// Test user data (ensure field names match the model)
const testUser = {
  firstName: "Test",
  SecondName: "User", // Corrected to match the model
  email: "test@example.com",
  password: "password123",
  passwordConfirm: "password123",
};

// Connect to test database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL);
});

// Clear database before each test
beforeEach(async () => {
  await User.deleteMany({});
});

// Close database connection after tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Registration", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);

    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe(
      "User registered successfully. Please check your email."
    );
    expect(res.body.data.user).toHaveProperty("email", testUser.email);
    expect(res.body.data.user.password).toBeUndefined(); // Password should not be returned
  });

  it("should fail if passwords don't match", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...testUser,
        passwordConfirm: "differentpassword",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Passwords do not match/);
  });

  it("should fail if email is invalid", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...testUser,
        email: "invalid-email",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Please provide a valid email/);
  });

  it("should fail if password is too short", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...testUser,
        password: "123",
        passwordConfirm: "123",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Password must be at least 6 characters/);
  });
});

describe("User Login", () => {
  beforeEach(async () => {
    await User.create(testUser);
  });

  it("should login with valid credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: testUser.email,
      password: testUser.password,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe("success");
    expect(res.body.data).toHaveProperty("token");
  });

  it("should fail with incorrect password", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: testUser.email,
        password: "wrongpassword",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Incorrect password/);
  });

  it("should fail with non-existent email", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({
        email: "nonexistent@example.com",
        password: testUser.password,
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/Email does not exist/);
  });
});

describe("Password Reset Flow", () => {
  let resetToken;

  beforeEach(async () => {
    await User.create(testUser);
  });

  describe("POST /api/auth/forgot-password", () => {
    it("should return success for valid email", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: testUser.email });

      expect(res.statusCode).toEqual(200);
      expect(res.body.status).toBe("success");
      expect(res.body.message).toMatch(
        /Password reset link has been sent to your email/
      );

      // Capture the reset token
      const user = await User.findOne({ email: testUser.email });
      resetToken = user.resetPasswordToken;
    });

    it("should fail for non-existent email", async () => {
      const res = await request(app)
        .post("/api/auth/forgot-password")
        .send({ email: "nonexistent@example.com" });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/this email not exist/);
    });
  });

  describe("POST /api/auth/reset-password/:token", () => {
    it("should successfully reset password with valid token", async () => {
      const unhashedToken = crypto.randomBytes(20).toString("hex");
      const hashedToken = crypto
        .createHash("sha256")
        .update(unhashedToken)
        .digest("hex");

      await User.updateOne(
        { email: testUser.email },
        {
          resetPasswordToken: hashedToken,
          resetPasswordExpiresAt: Date.now() + 3600000, // 1 hour
        }
      );

      const newPassword = "newPassword123";
      const res = await request(app)
        .post(`/api/auth/reset-password/${unhashedToken}`)
        .send({
          password: newPassword,
          passwordConfirm: newPassword,
        });

      expect(res.statusCode).toEqual(200);
      expect(res.body.message).toMatch(/Password reset successfully/);
    });

    it("should fail with invalid token", async () => {
      const res = await request(app)
        .post("/api/auth/reset-password/invalid-token")
        .send({
          password: "newPassword123",
          passwordConfirm: "newPassword123",
        });

      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toMatch(/Token is invalid or has expired/);
    });
  });
});