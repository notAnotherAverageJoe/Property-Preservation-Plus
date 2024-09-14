import React from "react";
import { Outlet, useParams } from "react-router-dom";
import UnitsManager from "./UnitsManager";
import AddTransactionForm from "../financialComponents/AddTransactionForm";
import "./PropertyDetail.css";
import { Link } from "react-router-dom";

function PropertyDetail() {
  const { id: propertyId } = useParams();

  return (
    <div>
      <h1>Property Detail</h1>
      <div>
        <Link to="/budget-forecast" className="button-link">
          Budget Forecast
        </Link>
      </div>

      {/* Flex container for side-by-side layout */}
      <div className="property-detail-container">
        {/* Units Manager */}
        <div className="property-detail-section">
          <h3>Units Management</h3>
          <UnitsManager propertyId={propertyId} />
        </div>

        {/* Transactions Form */}
        <div className="property-detail-section">
          <h3>Financial Management</h3>
          <h2>Property Expenses</h2>
          <AddTransactionForm propertyId={propertyId} />
        </div>
      </div>

      {/* This is for the nested routes */}
      <Outlet />
    </div>
  );
}

export default PropertyDetail;
