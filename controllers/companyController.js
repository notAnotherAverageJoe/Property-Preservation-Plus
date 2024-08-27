const companyModel = require("../models/companyModel");

// Controller to get all companies
const getAllCompanies = async (req, res) => {
  try {
    const companies = await companyModel.getAllCompanies();
    res.json(companies);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving companies", error: error.message });
  }
};

// Controller to get a company by ID
const getCompanyById = async (req, res) => {
  try {
    const company = await companyModel.getCompanyById(req.params.id);
    if (company) {
      res.json(company);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving company", error: error.message });
  }
};

// Controller to create a new company
const createCompany = async (req, res) => {
  try {
    const newCompany = await companyModel.createCompany(req.body);
    res.status(201).json(newCompany);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating company", error: error.message });
  }
};

// Controller to update a company
const updateCompany = async (req, res) => {
  try {
    const updatedCompany = await companyModel.updateCompany(
      req.params.id,
      req.body
    );
    if (updatedCompany) {
      res.json(updatedCompany);
    } else {
      res.status(404).json({ message: "Company not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating company", error: error.message });
  }
};

// Controller to delete a company
const deleteCompany = async (req, res) => {
  try {
    const result = await companyModel.deleteCompany(req.params.id);
    res.json(result);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting company", error: error.message });
  }
};

module.exports = {
  getAllCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
};
