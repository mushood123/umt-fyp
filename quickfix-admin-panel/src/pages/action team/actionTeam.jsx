import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../../components/searchBar/searchBar";
import API_URL from "../../api/config";
import Loading from "../../components/loading/loading";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import { HiOutlineEye } from "react-icons/hi";

import "./actionTeam.css";

function ActionTeam() {
  const [technicians, setTechnicians] = useState([]);
  const [filteredTechnicians, setFilteredTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/technicians/`);
        setTechnicians(response.data.technicians);
        setFilteredTechnicians(response.data.technicians);
      } catch (error) {
        console.error("Error fetching technicians:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleSearch = (query) => {
    const filtered = technicians.filter(
      (technician) =>
        technician.name.toLowerCase().includes(query.toLowerCase()) ||
        technician.email.toLowerCase().includes(query.toLowerCase()) ||
        technician.designation.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTechnicians(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/technicians/${id}`);
      setTechnicians((prevTechnicians) =>
        prevTechnicians.filter((technician) => technician.id !== id)
      );
      setFilteredTechnicians((prevTechnicians) =>
        prevTechnicians.filter((technician) => technician.id !== id)
      );
    } catch (error) {
      console.error("Error deleting technician:", error);
    }
  };

  const handleEditClick = (e, technicianId) => {
    e.stopPropagation(); // Prevent row click
    navigate(`/dashboard/technicianInfo/${technicianId}`);
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="technician-container">
      <h1>Registered Technicians</h1>
      <div className="btn-search">
        <button
          className="addTechnician-btn"
          onClick={() => navigate("/dashboard/addTechnician")}
        >
          + Add Technician
        </button>
        <SearchBar onSearch={handleSearch} />
      </div>
      <table className="technician-table">
        <thead>
          <tr>
            <th>Technician ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Designation</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id}>
              <td>{technician.id}</td>
              <td>{technician.name}</td>
              <td>{technician.email}</td>
              <td>{technician.phone}</td>
              <td>{technician.designation}</td>
              <td>
                <div className="action-icons">
                  <button
                    className="action-icon edit-icon"
                    style={{display: "flex", alignItems: "center",justifyContent: "center"}}
                    onClick={(e) => handleEditClick(e, technician.id)}
                  >
                    <FiEdit2 size={18} color="white" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ActionTeam;
