import React, { useState, useEffect } from "react";
import axios from "axios";
import API_URL from "../../api/config";
import "./clientAnnoucements.css";
import Loading from "../../components/loading/loading";

function ClientAnnouncements() {
  const [showModal, setShowModal] = useState(false);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    message: "",
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/users/clients/announcements`
      );
      setAnnouncements(response.data.announcements);
    } catch (error) {
      console.error("Error fetching announcements:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_URL}/users/clients/announcements/add`, formData);
      setShowModal(false);
      setFormData({ title: "", message: "" });
      fetchAnnouncements();
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/users/clients/announcements/${id}`);
      fetchAnnouncements();
    } catch (error) {
      console.error("Error deleting announcement:", error);
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
    <div className="container">
      <h2 className="heading">Client Announcements</h2>
      <button className="create-btn" onClick={() => setShowModal(true)}>
        Create <span className="plus-icon">✚</span>
      </button>

      {announcements.length > 0 ? (
        <table className="announcement-table">
          <thead>
            <tr>
              <th>TITLE</th>
              <th>MESSAGE</th>
              <th>CREATED AT</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((item) => (
              <tr key={item.id}>
                <td className="bold">{item.title}</td>
                <td>{item.message}</td>
                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                <td>
                  <span
                    className="delete"
                    onClick={() => handleDelete(item.id)}
                  >
                    Delete
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="no-data">No announcements available.</p>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={() => setShowModal(false)}>
              &times;
            </span>
            <h3>Add Announcement</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Enter Title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
              <textarea
                name="message"
                placeholder="Enter Message"
                value={formData.message}
                onChange={handleInputChange}
                required
              ></textarea>
              <button type="submit" className="submit-btn">
                Create Announcement
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientAnnouncements;
