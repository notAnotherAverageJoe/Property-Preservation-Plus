import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import CreateCompany from "./components/creationComponents/CreateCompany";
import PropertiesList from "./components/propertyComponents/PropertiesList";
import CreateProperty from "./components/propertyComponents/CreateProperty";
import PropertyDetail from "./components/propertyComponents/PropertyDetail";
import UnitsManager from "./components/UnitsManager";
import AddTransactionForm from "./components/creationComponents/AddTransactionForm";
import MaintenanceRequests from "./components/MaintenanceRequests";
import LeasesManager from "./components/leaseComponents/LeasesManager";
import withAuth from "./components/withAuth";
import Navbar from "./components/Navbar";
import "./components/Navbar.css";
import { AuthProvider } from "./contexts/AuthContext";
import TenantsManager from "./components/TenantsManager";
import CreateLease from "./components/creationComponents/CreateLease";
import EditProperty from "./components/pages/EditProperty";
import LeasesListByTenant from "./components/leaseComponents/LeasesListByTenant";
import RolesManager from "./components/RolesManager";
import CreateUserForm from "./components/creationComponents/CreateUserForm";
import Unauthorized from "./components/Unauthorized";

const ProtectedDashboard = withAuth(Dashboard, 1);
const ProtectedCreateCompany = withAuth(CreateCompany);
const ProtectedPropertiesList = withAuth(PropertiesList);
const ProtectedCreateProperty = withAuth(CreateProperty, 3);
const ProtectedPropertyDetail = withAuth(PropertyDetail, 1);
const ProtectedUnitsManager = withAuth(UnitsManager);
const ProtectedAddTransactionForm = withAuth(AddTransactionForm, 4);
const ProtectedMaintenanceRequests = withAuth(MaintenanceRequests, 1);
const ProtectedTenantsManager = withAuth(TenantsManager, 4);
const ProtectedLeasesManager = withAuth(LeasesManager, 4);
const ProtectedEditProperty = withAuth(EditProperty, 5);
const ProtectedLeasesListByTenant = withAuth(LeasesListByTenant, 5);
const ProtectedRolesManager = withAuth(RolesManager, null);
const ProtectedCreateUserForm = withAuth(CreateUserForm, null);

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
          <Route path="/dashboard/roles" element={<ProtectedRolesManager />} />
          <Route path="/create-user" element={<ProtectedCreateUserForm />} />
          <Route path="/unauthorized" element={<Unauthorized />} />{" "}
          {/* Unauthorized route */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
