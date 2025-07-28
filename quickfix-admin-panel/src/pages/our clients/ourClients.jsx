import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Edit } from "lucide-react";
import axios from "axios";
import Loading from "../../components/loading/loading";
import SearchBar from "../../components/searchBar/searchBar";
import API_URL from "../../api/config";
import "./ourClients.css";

function OurClients() {
  const navigate = useNavigate();
  const [clients, setClients] = useState([]);
  const [filteredClients, setFilteredClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchLoading, setSearchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/clients/`);
        if (!response.data || !response.data.clients) {
          throw new Error("Invalid data received from server");
        }
        setClients(response.data.clients);
        setFilteredClients(response.data.clients);
        setError(null);
      } catch (error) {
        console.error("Error fetching clients:", error);
        setError(
          error.response?.data?.message || "Failed to fetch clients data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClients();
  }, []);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query) => {
      if (!query.trim()) {
        // If search is empty, show all clients
        setFilteredClients(clients);
        setSearchLoading(false);
        return;
      }

      try {
        setSearchLoading(true);
        const response = await axios.get(`${API_URL}/users/clients/search`, {
          params: {
            query: query.trim(),
            fields: "preferredUserID,businessName",
          },
        });

        if (response.data && response.data.clients) {
          setFilteredClients(response.data.clients);
        } else {
          setFilteredClients([]);
        }
        setError(null);
      } catch (error) {
        console.error("Error searching clients:", error);
        // Fallback to local search if API search fails
        const localFiltered = clients.filter(
          (client) =>
            client.businessName.toLowerCase().includes(query.toLowerCase()) ||
            client.preferredUserID.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredClients(localFiltered);

        // Only show error if it's not a network issue
        if (error.response && error.response.status !== 404) {
          setError("Search temporarily unavailable, showing local results");
        }
      } finally {
        setSearchLoading(false);
      }
    }, 500), // 500ms delay
    [clients]
  );

  // Handle search input changes
  const handleSearch = (query) => {
    setSearchQuery(query);
    setSearchLoading(true);
    debouncedSearch(query);
  };

  // Clear search and reset to all clients
  const clearSearch = () => {
    setSearchQuery("");
    setFilteredClients(clients);
    setSearchLoading(false);
  };

  const handleRowClick = (client) => {
    setSelectedClient(client);
    setIsModalOpen(true);
  };

  const handleEditClick = (e, clientId) => {
    e.stopPropagation(); // Prevent row click
    navigate(`/dashboard/clientInfo/${clientId}`);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClient(null);
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  if (error && !filteredClients.length && !searchQuery) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="client-container">
      <h1>Our Clients</h1>
      <div className="btn-search">
        <div className="search-container">
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search by User ID or Business Name..."
            value={searchQuery}
          />
          {searchQuery && (
            <button
              className="clear-search-btn"
              onClick={clearSearch}
              title="Clear search"
            >
              ×
            </button>
          )}
          {searchLoading && <div className="search-spinner">Searching...</div>}
        </div>
      </div>

      {error && searchQuery && (
        <div className="search-error-message">{error}</div>
      )}

      {filteredClients.length === 0 ? (
        <div className="empty-state">
          <h3>
            {searchQuery ? "No clients found" : "No clients available"}
          </h3>
          <p>
            {searchQuery
              ? `No clients match "${searchQuery}". Try adjusting your search criteria.`
              : "Try adjusting your search criteria or check back later."}
          </p>
          {searchQuery && (
            <button className="clear-search-btn-large" onClick={clearSearch}>
              Show All Clients
            </button>
          )}
        </div>
      ) : (
        <div className="table-wrapper">
          <div className="results-info">
            {searchQuery && (
              <p className="search-results-text">
                Found {filteredClients.length} client
                {filteredClients.length !== 1 ? "s" : ""}{" "}
                {searchQuery && `matching "${searchQuery}"`}
              </p>
            )}
          </div>
          <table className="client-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Business Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Contact Number</th>
                <th>Address</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredClients.map((client) => (
                <tr key={client.id} onClick={() => handleRowClick(client)}>
                  <td>{client.preferredUserID}</td>
                  <td>{client.businessName}</td>
                  <td>{client.contactName}</td>
                  <td>{client.email}</td>
                  <td>{client.contactNumber}</td>
                  <td>{client.businessAddress}</td>
                  <td>
                    <button
                      className="edit-btn"
                      onClick={(e) => handleEditClick(e, client.id)}
                      title="View client details"
                    >
                      <Edit size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && selectedClient && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Client Details</h2>
              <button className="close-btn" onClick={closeModal} title="Close">
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="data-row">
                <span className="data-label">User ID:</span>
                <span className="data-value">
                  {selectedClient.preferredUserID}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Business Name:</span>
                <span className="data-value">
                  {selectedClient.businessName}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Contact Person:</span>
                <span className="data-value">
                  {selectedClient.contactName}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Email:</span>
                <span className="data-value">{selectedClient.email}</span>
              </div>
              <div className="data-row">
                <span className="data-label">Contact Number:</span>
                <span className="data-value">
                  {selectedClient.contactNumber}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Address:</span>
                <span className="data-value">
                  {selectedClient.businessAddress}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Coordinates:</span>
                <span className="data-value">
                  {selectedClient.businessCordinates.latitude},{" "}
                  {selectedClient.businessCordinates.longitude}
                </span>
              </div>
              <div className="data-row">
                <span className="data-label">Role:</span>
                <span className="data-value">{selectedClient.role}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// Debounce utility function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

export default OurClients;
