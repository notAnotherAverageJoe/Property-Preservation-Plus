import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";

import Login from "./components/pages/Login";
import Register from "./components/pages/Register";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard";
import CreateCompany from "./components/creationComponents/CreateCompany";
import PropertiesList from "./components/propertyComponents/PropertiesList";
import CreateProperty from "./components/propertyComponents/CreateProperty";
import PropertyDetail from "./components/propertyComponents/PropertyDetail";
import UnitsManager from "./components/UnitsManager";
import AddTransactionForm from "./components/financialComponents/AddTransactionForm";
import MaintenanceRequests from "./components/MaintenanceRequests";
import LeasesManager from "./components/leaseComponents/LeasesManager";
import withAuth from "./components/withAuth";
import Navbar from "./components/Navbar";
import "./components/styles/Navbar.css";
import { AuthProvider } from "./contexts/AuthContext";
import TenantsManager from "./components/TenantsManager";
import CreateLease from "./components/leaseComponents/CreateLease";
import EditProperty from "./components/pages/EditProperty";
import LeasesListByCompany from "./components/leaseComponents/LeasesListByCompany";
import RolesManager from "./components/RolesManager";
import CreateUserForm from "./components/creationComponents/CreateUserForm";
import Unauthorized from "./components/Unauthorized";
import BudgetForecast from "./components/BudgetForecast";
import "./components/styles/Pagination.css";
import ProfilePage from "./components/pages/ProfilePage";

const ProtectedDashboard = withAuth(Dashboard, 1);
const ProtectedCreateCompany = withAuth(CreateCompany);
const ProtectedPropertiesList = withAuth(PropertiesList, 1);
const ProtectedCreateProperty = withAuth(CreateProperty, 3);
const ProtectedPropertyDetail = withAuth(PropertyDetail, 1);
const ProtectedUnitsManager = withAuth(UnitsManager, 3);
const ProtectedAddTransactionForm = withAuth(AddTransactionForm, 4);
const ProtectedMaintenanceRequests = withAuth(MaintenanceRequests);
const ProtectedTenantsManager = withAuth(TenantsManager, 4);
const ProtectedLeasesManager = withAuth(LeasesManager, 2);
const ProtectedEditProperty = withAuth(EditProperty, 4);
const ProtectedLeasesListByTenant = withAuth(LeasesListByCompany, 4);
const ProtectedRolesManager = withAuth(RolesManager, 8);
const ProtectedCreateUserForm = withAuth(CreateUserForm, 8);
const ProtectedBudgetForecast = withAuth(BudgetForecast);
const ProtectedProfilePage = withAuth(ProfilePage);

function AppLayout() {
  const location = useLocation(); // useLocation inside the Router context
  const hideNavbarOnRoutes = ["/login", "/register"];
  const shouldHideNavbar = hideNavbarOnRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<ProtectedProfilePage />} />{" "}
        <Route path="/create-company" element={<ProtectedCreateCompany />} />
        <Route path="/budget-forecast" element={<ProtectedBudgetForecast />} />
        <Route path="/dashboard" element={<ProtectedDashboard />} />
        <Route path="/properties" element={<ProtectedPropertiesList />} />
        <Route path="/tenants" element={<ProtectedTenantsManager />} />
        <Route path="/edit-property/:id" element={<ProtectedEditProperty />} />
        <Route path="/create-property" element={<ProtectedCreateProperty />} />
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
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppLayout />
      </Router>
    </AuthProvider>
  );
}

export default App;
