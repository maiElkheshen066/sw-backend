const request = require("supertest");
const mongoose = require("mongoose");
const crypto = require("crypto");
const app = require("../../app"); // Your Express app
const User = require("../../models/User"); // Your User model
// TODO  npx jest tests/integration/auth.test

const testUser = {
  firstName: "Test",
  SecondName: "User",
  email: "test@example.com",
  gender:"female",
mobileNumber:"+201442303",
  password: "password123",
  passwordConfirm: "password123",
};

// Connect to test database before running tests
beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL);
});

beforeEach(async () => {
  await User.deleteMany({});
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Registration", () => {
  it("should register a new user successfully", async () => {
    const res = await request(app).post("/api/auth/register").send(testUser);
    expect(res.statusCode).toEqual(201);
    expect(res.body.status).toBe("success");
    expect(res.body.message).toBe("User registered successfully. Please check your email."  );
    expect(res.body.data.user.newUser).toHaveProperty("email", testUser.email);
    expect(typeof res.body.data.user.newUser.password).toBe("string");
    expect(res.body.data.user.newUser.password).not.toBe(testUser.password);
  });

  it("should fail if passwords don't match", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        ...testUser,
        passwordConfirm: "differentpassword",
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.message).toMatch(/User validation failed: passwordConfirm: Passwords don't match/);
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

