import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useParams, useNavigate } from "react-router-dom"; // Import useNavigate
import DOMPurify from "dompurify"; // Import DOMPurify
import "../styles/MaintenanceRequests.css";

const MaintenanceRequests = () => {
  const { propertyId, unitId } = useParams();
  const { token } = useAuth();
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    request_description: "",
    status: "Pending",
  });
  const [selectedRequest, setSelectedRequest] = useState(null);

  const navigate = useNavigate(); // Initialize useNavigate

  // Set axios default headers for authentication
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  const fetchRequests = useCallback(async () => {
    try {
      if (!unitId) {
        console.error("No unitId provided");
        return;
      }
      const response = await axios.get(
        `http://localhost:3000/api/${unitId}/requests`
      );
      setRequests(response.data);
    } catch (error) {
      console.error("Error fetching requests:", error);
    }
  }, [unitId]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sanitize the request description before submission
      const sanitizedDescription = DOMPurify.sanitize(
        formData.request_description
      );

      const dataToSend = {
        ...formData,
        request_description: sanitizedDescription, // Use sanitized description
      };

      if (selectedRequest) {
        // Update request
        await axios.put(
          `http://localhost:3000/api/requests/${selectedRequest.id}`,
          dataToSend
        );
      } else {
        // Create request
        await axios.post(
          `http://localhost:3000/api/${unitId}/requests`,
          dataToSend
        );
      }
      fetchRequests();
      setFormData({ request_description: "", status: "Pending" });
      setSelectedRequest(null);
    } catch (error) {
      console.error("Error saving request:", error);
    }
  };

  const handleEdit = (request) => {
    setSelectedRequest(request);
    setFormData({
      request_description: request.request_description,
      status: request.status,
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/requests/${id}`);
      fetchRequests();
    } catch (error) {
      console.error("Error deleting request:", error);
    }
  };

  return (
    <div className="maintenance-requests-container">
      <h2>Maintenance Requests for Unit {unitId}</h2>

      <form onSubmit={handleSubmit}>
        <textarea
          name="request_description"
          placeholder="Request Description"
          value={formData.request_description}
          onChange={handleChange}
          required
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit">
          {selectedRequest ? "Update Request" : "Create Request"}
        </button>
        <button onClick={() => navigate(-1)} className="back-button">
          Back to Current Property
        </button>
      </form>
      <ul>
        {requests.map((request) => (
          <li key={request.id} className="maintenance-request-item">
            <span className="request-description">
              {/* Sanitize output before rendering */}
              {DOMPurify.sanitize(request.request_description)} -{" "}
              <span
                className={`request-status ${request.status.toLowerCase()}`}
              >
                {request.status}
              </span>
            </span>
            <div className="request-actions">
              <button
                className="pill-link-edit"
                onClick={() => handleEdit(request)}
              >
                Edit
              </button>
              <button
                className="pill-link-delete"
                onClick={() => handleDelete(request.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MaintenanceRequests;
