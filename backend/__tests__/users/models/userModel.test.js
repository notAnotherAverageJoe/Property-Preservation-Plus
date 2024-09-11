// npm test backend/__tests__

const pool = require("../../../../config/db"); // Update path as necessary
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  getUsersByCompanyId,
} = require("../../../../models/userModel"); // Update path as necessary
const createUniqueSampleUser = () => ({
  company_id: 1,
  first_name: "John",
  last_name: "Doe",
  email: `john.doe.${Date.now()}@example.com`, // Unique email
  password_hash: "hashedpassword",
});

let client;

beforeAll(async () => {
  client = await pool.connect();
});

beforeEach(async () => {
  await client.query("BEGIN"); // Start a transaction
});

afterEach(async () => {
  await client.query("ROLLBACK"); // Rollback the transaction
});

afterAll(async () => {
  client.release();
  await pool.end();
});

describe("User Model Tests", () => {
  test("should create a user", async () => {
    const sampleUser = createUniqueSampleUser();
    const user = await createUser(sampleUser);
    console.log("Created User:", user);
    expect(user).toHaveProperty("id");
    expect(user.first_name).toBe(sampleUser.first_name);
    expect(user.last_name).toBe(sampleUser.last_name);
    expect(user.email).toBe(sampleUser.email);
  });

  test("should get a user by ID", async () => {
    const sampleUser = createUniqueSampleUser();
    const createdUser = await createUser(sampleUser);
    const user = await getUserById(createdUser.id);
    console.log("Retrieved User:", user);
    expect(user).toHaveProperty("id");
    expect(user.email).toBe(sampleUser.email);
  });

  test("should delete a user", async () => {
    const sampleUser = createUniqueSampleUser();
    const createdUser = await createUser(sampleUser);
    await deleteUser(createdUser.id);
    const user = await getUserById(createdUser.id);
    console.log("Deleted User:", user);
    expect(user).toBeUndefined();
  });

  test("should get users by company ID", async () => {
    const sampleUser = createUniqueSampleUser();
    await createUser(sampleUser);
    const users = await getUsersByCompanyId(sampleUser.company_id);
    console.log("Users by Company ID:", users);
    expect(users.length).toBeGreaterThan(0);
  });

  test("getUserById should retrieve a user by ID", async () => {
    const sampleUser = createUniqueSampleUser();
    const createdUser = await createUser(sampleUser);
    const retrievedUser = await getUserById(createdUser.id);
    console.log("Retrieved User:", retrievedUser);
    expect(retrievedUser).toEqual(expect.objectContaining(sampleUser));
  });
});
