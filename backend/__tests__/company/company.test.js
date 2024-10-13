const request = require("supertest");
const jwt = require("jsonwebtoken");
const app = require("../../../server");
const companyModel = require("../../../models/companyModel");

// Mock the companyModel methods
jest.mock("../../../models/companyModel", () => ({
  updateUserCompanyId: jest.fn(),
  deleteCompany: jest.fn(),
}));

const mockToken = jwt.sign({ id: 1, company_id: 123 }, process.env.JWT_SECRET, {
  expiresIn: "1h",
});
const mockNewToken = jwt.sign(
  { id: 1, company_id: 456 },
  process.env.JWT_SECRET,
  { expiresIn: "1h" }
);

describe("Company API", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update the company ID and generate a new token", async () => {
    companyModel.updateUserCompanyId.mockResolvedValueOnce();
    jest.spyOn(jwt, "sign").mockReturnValue(mockNewToken);

    const response = await request(app)
      .put("/api/companies/update")
      .send({ companyId: 456 })
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ newToken: mockNewToken });
  });

  it("should delete a company successfully", async () => {
    companyModel.deleteCompany.mockResolvedValueOnce({
      message: "Company deleted",
    });

    const response = await request(app)
      .delete("/api/companies/1")
      .set("Authorization", `Bearer ${mockToken}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Company deleted" });
  });
});
