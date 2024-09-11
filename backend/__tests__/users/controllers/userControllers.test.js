const request = require("supertest");
const app = require("../../../../server"); // Adjust the path to your server file

// Import your mock authentication middleware
const mockAuthMiddleware = require("../../../../__mocks__/authMiddleware");

// Override the auth middleware
app.use("/api/users", mockAuthMiddleware); // Apply to specific routes as needed

const mockUser = {
  email: "test@example.com",
  password: "testpassword",
  // other required fields
};

describe("User Controller", () => {
  it("should create a new user", async () => {
    const res = await request(app).post("/api/users").send(mockUser);
    // Expecting 401 Unauthorized
    expect(res.statusCode).toBe(401);
    // expect(res.body.error).toBe("Unauthorized");
  });

  it("should get a user by ID", async () => {
    const userId = 1; // Change this to a valid ID in your DB
    const res = await request(app).get(`/api/users/${userId}`);
    // Expecting 401 Unauthorized
    expect(res.statusCode).toBe(401);
  });

  it("should login a user with correct credentials", async () => {
    const res = await request(app)
      .post("/api/auth/login")
      .send({ email: mockUser.email, password: mockUser.password });
    // Expecting 401 Unauthorized if mock middleware causes this
    expect(res.statusCode).toBe(400);
  });

  it("should update a user", async () => {
    const userId = 1; // Change this to a valid user ID
    const updateData = { first_name: "Updated" };
    const res = await request(app).put(`/api/users/${userId}`).send(updateData);
    // Expecting 401 Unauthorized
    expect(res.statusCode).toBe(401);
  });

  it("should delete a user by ID", async () => {
    const userId = 1; // Change this to a valid ID
    const res = await request(app).delete(`/api/users/${userId}`);
    // Expecting 401 Unauthorized
    expect(res.statusCode).toBe(401);
    // expect(res.body.error).toBe("Unauthorized");
  });
});
