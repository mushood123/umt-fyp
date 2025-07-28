import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/loading";
import API_URL from "../../api/config";
import { rtdb } from "../../firebase/config";
import { ref, push, onValue } from "firebase/database";
import { FiEdit2 } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import "./editTech.css";

function TechnicianInfo() {
  const { id: technicianId } = useParams();
  const [technicianData, setTechnicianData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchTechnicianInfo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/technicians/${technicianId}`
        );
        // console.log("Technician Detail:", response.data);
        setTechnicianData(response.data.technician);
        setError(null);
      } catch (error) {
        console.error("Error fetching technician info:", error);
        setError(
          error.response?.data?.message || "Failed to fetch technician data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicianInfo();
  }, [technicianId]);

  useEffect(() => {
    if (technicianData?.id) {
      const notifRef = ref(rtdb, `users/${technicianData.id}/notifications`);

      onValue(notifRef, (snapshot) => {
        const data = snapshot.val();
        const fetchedNotifications = data
          ? Object.keys(data).map((key) => ({
              id: key,
              ...data[key],
            }))
          : [];
        setNotifications(fetchedNotifications);
      });
    }

    return () => {
      if (technicianData?.id) {
        const notifRef = ref(rtdb, `users/${technicianData.id}/notifications`);
      }
    };
  }, [technicianData?.id]);

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    setIsProcessing(true);
    try {
      const uid = technicianData?.id;
      if (!uid) throw new Error("User UID not found");

      await push(ref(rtdb, `users/${uid}/notifications`), {
        message: messageText,
        from: "Admin",
        isSeened: false,
        sendedAt: new Date().toISOString(),
      });

      setMessageText("");
      setIsMessageModalOpen(false);
      navigate(`/dashboard/technicianInfo/${technicianId}`);
    } catch (err) {
      setError("Failed to send message");
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await axios.delete(`${API_URL}/users/technicians/${technicianId}`);
      navigate("/dashboard/actionTeam");
    } catch (error) {
      setError("Failed to delete technician");
    } finally {
      setIsProcessing(false);
      setIsDeleteModalOpen(false);
    }
  };

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">Error: {error}</div>;
  }

  return (
    <div className="technician-info-container">
      <h1>Technician Information</h1>

      <div className="action-buttons">
        <Link
          to={`/dashboard/addTechnician/${technicianId}`}
          className="action-icon edit-icon"
        >
          <FiEdit2 size={20} /> Edit
        </Link>
        <button
          className="action-icon delete-icon"
          onClick={() => setIsDeleteModalOpen(true)}
        >
          <RiDeleteBin6Line size={20} /> Delete
        </button>
        <button
          className="action-btn msg-btn"
          onClick={() => setIsMessageModalOpen(true)}
        >
          Send Message
        </button>
      </div>

      <div className="info-section">
        <h2>Technician Details</h2>
        <div className="info-grid">
          <div className="info-item">
            <strong>Name:</strong>
            <p>{technicianData?.name ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>{technicianData?.email ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Phone:</strong>
            <p>{technicianData?.phone ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Designation:</strong>
            <p>{technicianData?.designation ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>User ID:</strong>
            <p>{technicianData?.id ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Role:</strong>
            <p>
              {technicianData?.role === 1 ? "Technician" : technicianData?.role}
            </p>
          </div>
        </div>
      </div>

      {/* Display Notifications */}
      <div className="notification-section">
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          <ul>
            {notifications.map((notification) => (
              <li key={notification.id}>
                <strong>{notification.from}:</strong> {notification.message}
                <br />
                <small>
                  {new Date(notification.sendedAt).toLocaleString()}
                </small>
              </li>
            ))}
          </ul>
        ) : (
          <p>No notifications found.</p>
        )}
      </div>

      {isMessageModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Send Message</h2>
              <button
                className="modal-close"
                onClick={() => setIsMessageModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Type your message here..."
                rows={5}
                className="form-control"
              ></textarea>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsMessageModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary"
                onClick={handleSendMessage}
                disabled={isProcessing || !messageText.trim()}
              >
                {isProcessing ? "Sending..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Delete Technician</h2>
              <button
                className="modal-close"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-message">
                Are you sure you want to delete this technician? This action
                cannot be undone.
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn-primary delete-btn"
                onClick={handleDelete}
                disabled={isProcessing}
              >
                {isProcessing ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TechnicianInfo;
