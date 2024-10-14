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
import UnitsManager from "./components/propertyComponents/UnitsManager";
import AddTransactionForm from "./components/financialComponents/AddTransactionForm";
import MaintenanceRequests from "./components/maintenanceComponents/MaintenanceRequests";
import LeasesManager from "./components/leaseComponents/LeasesManager";
import withAuth from "./components/withAuth";
import Navbar from "./components/pages/Navbar";
import "./components/styles/Navbar.css";
import { AuthProvider } from "./contexts/AuthContext";
import TenantsManager from "./components/propertyComponents/TenantsManager";
import EditProperty from "./components/propertyComponents/EditProperty";
import LeasesListByCompany from "./components/leaseComponents/LeasesListByCompany";
import RolesManager from "./components/RolesManager";
import CreateUserForm from "./components/creationComponents/CreateUserForm";
import Unauthorized from "./components/Unauthorized";
import BudgetForecast from "./components/Budgets/BudgetForecast";
import "./components/styles/Pagination.css";
import ProfilePage from "./components/pages/ProfilePage";
import Tutorial from "./components/pages/Tutorial";
import withSanitization from "./utils/withSanitization"; // Import your sanitization HOC

// Wrap components with both withSanitization and withAuth
const ProtectedSanitizedDashboard = withSanitization(withAuth(Dashboard, 1));
const ProtectedSanitizedCreateCompany = withSanitization(
  withAuth(CreateCompany)
);
const ProtectedSanitizedPropertiesList = withSanitization(
  withAuth(PropertiesList, 1)
);
const ProtectedSanitizedCreateProperty = withSanitization(
  withAuth(CreateProperty, 3)
);
const ProtectedSanitizedPropertyDetail = withSanitization(
  withAuth(PropertyDetail, 1)
);
const ProtectedSanitizedUnitsManager = withSanitization(
  withAuth(UnitsManager, 3)
);
const ProtectedSanitizedAddTransactionForm = withSanitization(
  withAuth(AddTransactionForm, 1)
);
const ProtectedSanitizedMaintenanceRequests = withSanitization(
  withAuth(MaintenanceRequests, 1)
);
const ProtectedSanitizedTenantsManager = withSanitization(
  withAuth(TenantsManager, 3)
);
const ProtectedSanitizedLeasesManager = withSanitization(
  withAuth(LeasesManager, 3)
);
const ProtectedSanitizedEditProperty = withSanitization(
  withAuth(EditProperty, 3)
);
const ProtectedSanitizedLeasesListByTenant = withSanitization(
  withAuth(LeasesListByCompany, 3)
);
const ProtectedSanitizedRolesManager = withSanitization(
  withAuth(RolesManager, 4)
);
const ProtectedSanitizedCreateUserForm = withSanitization(
  withAuth(CreateUserForm, 5)
);
const ProtectedSanitizedBudgetForecast = withSanitization(
  withAuth(BudgetForecast, 1)
);
const ProtectedSanitizedProfilePage = withSanitization(
  withAuth(ProfilePage, 1)
);

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
        <Route path="/tutorial" element={<Tutorial />} />
        <Route
          path="/profile/:id"
          element={<ProtectedSanitizedProfilePage />}
        />
        <Route
          path="/create-company"
          element={<ProtectedSanitizedCreateCompany />}
        />
        <Route
          path="/budget-forecast"
          element={<ProtectedSanitizedBudgetForecast />}
        />
        <Route path="/dashboard" element={<ProtectedSanitizedDashboard />} />
        <Route
          path="/properties"
          element={<ProtectedSanitizedPropertiesList />}
        />
        <Route path="/tenants" element={<ProtectedSanitizedTenantsManager />} />
        <Route
          path="/edit-property/:id"
          element={<ProtectedSanitizedEditProperty />}
        />
        <Route
          path="/create-property"
          element={<ProtectedSanitizedCreateProperty />}
        />
        <Route
          path="/property/:id"
          element={<ProtectedSanitizedPropertyDetail />}
        >
          <Route path="units" element={<ProtectedSanitizedUnitsManager />} />
          <Route
            path="transactions"
            element={<ProtectedSanitizedAddTransactionForm />}
          />
        </Route>
        <Route
          path="/properties/:propertyId/units/:unitId/requests"
          element={<ProtectedSanitizedMaintenanceRequests />}
        />
        <Route path="/leases" element={<ProtectedSanitizedLeasesManager />} />
        <Route
          path="/leases-by-tenant/:tenantId"
          element={<ProtectedSanitizedLeasesListByTenant />}
        />
        <Route
          path="/dashboard/roles"
          element={<ProtectedSanitizedRolesManager />}
        />
        <Route
          path="/create-user"
          element={<ProtectedSanitizedCreateUserForm />}
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </>
  );
}

const SanitizedAppLayout = withSanitization(AppLayout);

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <SanitizedAppLayout />
      </AuthProvider>
    </Router>
  );
};

export default App;
