import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import CreateCompany from "./components/CreateCompany";
import PropertiesList from "./components/PropertiesList";
import CreateProperty from "./components/CreateProperty";
import PropertyDetail from "./components/PropertyDetail";
import UnitsManager from "./components/UnitsManager";
import AddTransactionForm from "./components/AddTransactionForm";
import MaintenanceRequests from "./components/MaintenanceRequests";
import LeasesManager from "./components/LeasesManager";
import withAuth from "./components/withAuth";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import { AuthProvider } from "./contexts/AuthContext";
import TenantsManager from "./components/TenantsManager";
import CreateLease from "./components/CreateLease";
import EditProperty from "./components/pages/EditProperty";
import LeasesListByTenant from "./components/LeasesListByTenant";
import RolesManager from "./components/RolesManager";

const ProtectedDashboard = withAuth(Dashboard);
const ProtectedCreateCompany = withAuth(CreateCompany);
const ProtectedPropertiesList = withAuth(PropertiesList);
const ProtectedCreateProperty = withAuth(CreateProperty);
const ProtectedPropertyDetail = withAuth(PropertyDetail);
const ProtectedUnitsManager = withAuth(UnitsManager);
const ProtectedAddTransactionForm = withAuth(AddTransactionForm);
const ProtectedMaintenanceRequests = withAuth(MaintenanceRequests);
const ProtectedTenantsManager = withAuth(TenantsManager);
const ProtectedLeasesManager = withAuth(LeasesManager);
const ProtectedEditProperty = withAuth(EditProperty);
const ProtectedLeasesListByTenant = withAuth(LeasesListByTenant);
const ProtectedRolesManager = withAuth(RolesManager); // Protect Roles Manager

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-company" element={<ProtectedCreateCompany />} />
          <Route path="/dashboard" element={<ProtectedDashboard />} />
          <Route path="/properties" element={<ProtectedPropertiesList />} />
          <Route path="/tenants" element={<ProtectedTenantsManager />} />
          <Route
            path="/edit-property/:id"
            element={<ProtectedEditProperty />}
          />
          <Route
            path="/create-property"
            element={<ProtectedCreateProperty />}
          />
          <Route path="/property/:id" element={<ProtectedPropertyDetail />}>
            <Route path="units" element={<ProtectedUnitsManager />} />
            <Route
              path="transactions"
              element={<ProtectedAddTransactionForm />}
            />
          </Route>
          <Route
            path="/properties/:propertyId/units/:unitId/requests"
            element={<ProtectedMaintenanceRequests />}
          />
          <Route path="/leases" element={<ProtectedLeasesManager />} />
          <Route path="/create-lease" element={<CreateLease />} />
          <Route
            path="/leases-by-tenant/:tenantId"
            element={<ProtectedLeasesListByTenant />}
          />
          <Route path="/dashboard/roles" element={<ProtectedRolesManager />} />{" "}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
