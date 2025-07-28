import React, { useEffect, useState } from "react";
import API_URL from "../../api/config";
import "./clientRequests.css";
import axios from "axios";
import Loading from "../../components/loading/loading";

function ClientRequests() {
  const [requestsData, setRequestsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/clients/requests`);
        const businesses = response.data.businesses || [];
        const formattedData = businesses.flatMap((business) =>
          (business.requests || []).map((req) => ({
            id: req.requestID || "N/A",
            businessName: business.businessName || "N/A",
            createdBy: req.createdBy || "N/A",
            discipline: req.requestDetail || "N/A",
            postedAt: req.timeStamp || "N/A",
            status: req.status || "N/A",
            assignedTo: req.technicianDetails?.technicianName || "Not Assigned",
            timeSlot: req.technicianDetails?.timeSlot || "N/A",
          }))
        );

        setRequestsData(formattedData);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  const filteredData = requestsData.filter((item) => {
    const query = searchQuery.toLowerCase();
    return (
      item.id.toLowerCase().includes(query) ||
      item.businessName.toLowerCase().includes(query) ||
      item.createdBy.toLowerCase().includes(query) ||
      item.discipline.toLowerCase().includes(query) ||
      item.status.toLowerCase().includes(query) ||
      item.assignedTo.toLowerCase().includes(query)
    );
  });

  return (
    <div className="client-requests-container">
      <h2 className="page-title">Client Requests</h2>

      <div className="search-section">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search requests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <select>
          <option value="all">All</option>
          <option value="new">Open Users</option>
          <option value="assigned">Registered Users</option>
        </select>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <table>
          <thead>
            <tr>
              <th>REQUEST ID</th>
              <th>BUSINESS NAME</th>
              <th>CREATED BY</th>
              <th>DISCIPLINE</th>
              <th>POSTED AT</th>
              <th>STATUS</th>
              <th>ASSIGNED TO</th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.businessName}</td>
                <td>{item.createdBy}</td>
                <td>{item.discipline}</td>
                <td>{item.postedAt}</td>
                <td>
                  <span className={`status-badge status-${item.status.toLowerCase()}`}>
                    {item.status}
                  </span>
                </td>
                <td>
                  <span className={`technician-name ${item.assignedTo === 'Not Assigned' ? 'not-assigned' : ''}`}>
                    {item.assignedTo}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientRequests;
