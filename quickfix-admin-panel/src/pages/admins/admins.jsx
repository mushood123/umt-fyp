import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import SearchBar from "../../components/searchBar/searchBar";
import API_URL from "../../api/config";
import Loading from "../../components/loading/loading";

import "./admins.css";

function Admins() {
  const [admins, setAdmins] = useState([]);
  const [filteredAdmins, setFilteredAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get(`${API_URL}/users/admins/`);
        setAdmins(response.data.admins);
        setFilteredAdmins(response.data.admins);
      } catch (error) {
        console.error("Error fetching admins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, []);

  const handleSearch = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    const filtered = admins.filter(
      (admin) =>
        admin.name?.toLowerCase().includes(lowerCaseQuery) ||
        admin.role?.toLowerCase().includes(lowerCaseQuery) ||
        admin.email?.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredAdmins(filtered);
  };

  const deleteAdmin = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/admins/${id}`);
      setAdmins((prevAdmins) => prevAdmins.filter((admin) => admin.id !== id));
      setFilteredAdmins((prevAdmins) =>
        prevAdmins.filter((admin) => admin.id !== id)
      );
    } catch (error) {
      console.error("Error deleting admin:", error);
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  return (
    <div className="admin-container">
      <h1>Registered Admins</h1>

      <div className="btn-search">
        <button
          className="addAdmin-btn"
          onClick={() => navigate("/dashboard/addAdmin")}
        >
          + Add Admin
        </button>

        <SearchBar onSearch={handleSearch} />
      </div>

      <table className="admin-table">
        <thead>
          <tr>
            <th>User ID</th>
            <th>Image</th>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredAdmins.map((admin) => (
            <tr key={admin.id}>
              <td>{admin.id}</td>
              <td>
                <img src={admin.image} alt="Admin" width="50" />
              </td>
              <td>{admin.name}</td>
              <td>{admin.role}</td>
              <td>{admin.email}</td>
              <td className="action">
                <Link to={`/dashboard/addAdmin/${admin.id}`}>
                  <FaUserEdit className="adminEdit-icon" />
                </Link>

                <MdDelete
                  className="adminDelete-icon"
                  onClick={() => deleteAdmin(admin.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admins;
