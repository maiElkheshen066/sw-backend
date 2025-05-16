const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../../app");
const User = require("../../models/User");
const jwt = require("jsonwebtoken");

//  npx jest tests/integration/profile.test

const testUser = {
  firstName: "Profile",
  SecondName: "Tester", // Use capital S
  email: "profiletester@example.com",
  gender: "female",
  mobileNumber: "+201442304",
  password: "profilepass123",
  passwordConfirm: "profilepass123", // Include this!
  role: "user"
};

let token, userId;

beforeAll(async () => {
  await mongoose.connect(process.env.TEST_DATABASE_URL);
});

beforeEach(async () => {
  await User.deleteMany({});
  // Register a user for profile routes
  const user = await User.create({ ...testUser });
  userId = user._id;
  token = jwt.sign({ id: user._id }, process.env.JWT_SECRET || "testsecret");
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Profile API integration test", () => {

  it("gets logged-in user's profile by token", async () => {
    const res = await request(app)
      .get("/api/profile")
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.email).toBe(testUser.email);
    expect(res.body.password).toBeUndefined();
    expect(res.body.firstName).toBe(testUser.firstName);
    expect(res.body.SecondName).toBe(testUser.SecondName); // Use capital S
  });

  it("returns 401 if not authenticated", async () => {
    const res = await request(app).get("/api/profile");
    expect(res.statusCode).toBe(401);
  });

  it("updates the profile with valid data", async () => {
    const updates = {
      firstName: "Updated",
      secondName: "User", // Use lowercase to match controller
      email: "updatedprofile@example.com",
      gender: "male",
      mobileNumber: "+201442305",
      role: "admin"
    };
    const res = await request(app)
      .put("/api/profile")
      .set("Authorization", `Bearer ${token}`)
      .send(updates);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe("Profile updated successfully");
    expect(res.body.user.firstName).toBe(updates.firstName);
    expect(res.body.user.SecondName).toBe(updates.secondName); // Model returns capital S
    expect(res.body.user.email).toBe(updates.email);
    expect(res.body.user.gender).toBe(updates.gender);
    expect(res.body.user.role).toBe(updates.role);
    expect(res.body.user.mobileNumber).toBe(updates.mobileNumber);
  });

});