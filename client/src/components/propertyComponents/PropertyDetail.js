import React from "react";
import { Outlet, useParams } from "react-router-dom";
import UnitsManager from "../UnitsManager";
import AddTransactionForm from "../AddTransactionForm";
import "./PropertyDetail.css";

function PropertyDetail() {
  const { id: propertyId } = useParams();

  return (
    <div>
      <h1>Property Detail</h1>

      {/* Flex container for side-by-side layout */}
      <div className="property-detail-container">
        {/* Units Manager */}
        <div className="property-detail-section">
          <h2>Units Management</h2>
          <UnitsManager propertyId={propertyId} />
        </div>

        {/* Transactions Form */}
        <div className="property-detail-section">
          <h3>Financial Transactions</h3>
          <AddTransactionForm propertyId={propertyId} />
        </div>
      </div>

      {/* This will render nested routes like MaintenanceRequests */}
      <Outlet />
    </div>
  );
}

export default PropertyDetail;
