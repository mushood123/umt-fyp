import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../components/loading/loading";
import API_URL from "../../api/config";
import { rtdb } from "../../firebase/config";
import { ref, push, onValue } from "firebase/database";
import "./clientInfo.css";

function ClientInfo() {
  const { id: clientId } = useParams();
  const [clientData, setClientData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBlockModalOpen, setIsBlockModalOpen] = useState(false);
  const [isCreditsModalOpen, setIsCreditsModalOpen] = useState(false);
  const [creditsToAdd, setCreditsToAdd] = useState(0);
  const [validTill, setValidTill] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [notificationsPerPage] = useState(10);

  useEffect(() => {
    const fetchClientInfo = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/users/clients/${clientId}`
        );
        if (!response.data || !response.data.clientInfo) {
          throw new Error("Invalid data received from server");
        }
        setClientData(response.data.clientInfo);
        setError(null);
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to fetch client data"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchClientInfo();
  }, [clientId]);

  useEffect(() => {
    if (clientData?.id) {
      const notifRef = ref(rtdb, `users/${clientData.id}/notifications`);

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
      // Detach the listener when the component unmounts
      if (clientData?.id) {
        const notifRef = ref(rtdb, `users/${clientData.id}/notifications`);
        // off(notifRef); // Remove all listeners from the reference
      }
    };
  }, [clientData?.id]);

  const handleBlockUser = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${API_URL}/users/clients/${clientId}/block`);

      // Send push notification for block action
      await axios.post(`${API_URL}/push/send/`, {
        authToken: process.env.REACT_APP_AUTH_KEY,
        tokens: [clientData?.fcmToken],
        messageBody:
          "Your account has been temporarily blocked. Please contact support for assistance.",
        messageTitle: "Account Status Update",
        imageURL: "",
        data: {
          type: "account_blocked",
          clientId: clientId,
          timestamp: new Date().toISOString(),
        },
      });

      // Save notification to Firebase
      await push(ref(rtdb, `users/${clientData.id}/notifications`), {
        message:
          "Your account has been temporarily blocked. Please contact support for assistance.",
        from: "Admin",
        isSeened: false,
        sendedAt: new Date().toISOString(),
      });

      if (clientData?.fcmToken) {
        // Send push notification for block action
        axios.post(`${API_URL}/push/send/`, {
          authToken: process.env.REACT_APP_AUTH_KEY,
          tokens: [clientData?.fcmToken],
          messageBody:
            "Your account has been temporarily blocked. Please contact support for assistance.",
          messageTitle: "Account Status Update",
          imageURL: "",
          data: {
            type: "account_blocked",
            clientId: clientId,
            timestamp: new Date().toISOString(),
          },
        });
      }
      setClientData((prev) => ({
        ...prev,
        userData: { ...prev.userData, isBlocked: true },
      }));
    } catch (error) {
      setError("Failed to block user");
    } finally {
      setIsProcessing(false);
      setIsBlockModalOpen(false);
    }
  };

  const handleUnblockUser = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${API_URL}/users/clients/${clientId}/unblock`);

      // Save notification to Firebase
      await push(ref(rtdb, `users/${clientData.id}/notifications`), {
        message:
          "Your account has been successfully unblocked. You can now access all platform features.",
        from: "Admin",
        isSeened: false,
        sendedAt: new Date().toISOString(),
      });

      if (clientData?.fcmToken) {
        // Send push notification for unblock action
        axios.post(`${API_URL}/push/send/`, {
          authToken: process.env.REACT_APP_AUTH_KEY,
          tokens: [clientData?.fcmToken],
          messageBody:
            "Your account has been successfully unblocked. You can now access all platform features.",
          messageTitle: "Account Restored",
          imageURL: "",
          data: {
            type: "account_unblocked",
            clientId: clientId,
            timestamp: new Date().toISOString(),
          },
        });
      }
      setClientData((prev) => ({
        ...prev,
        userData: { ...prev.userData, isBlocked: false },
      }));
    } catch (error) {
      setError("Failed to unblock user");
    } finally {
      setIsProcessing(false);
      setIsBlockModalOpen(false);
    }
  };

  const handleAddCredits = async () => {
    setIsProcessing(true);
    try {
      await axios.put(`${API_URL}/users/clients/${clientId}/credits`, {
        credits: creditsToAdd,
        validTill: validTill ? new Date(validTill).toISOString() : undefined,
      });
      // Save notification to Firebase
      await push(ref(rtdb, `users/${clientData.id}/notifications`), {
        message: `${creditsToAdd} credits have been added to your account. Your new balance is ${
          (clientData?.package?.remaining ?? 0) + Number(creditsToAdd)
        } credits. Valid till: ${
          validTill ? new Date(validTill).toLocaleString() : "-"
        }`,
        from: "Admin",
        isSeened: false,
        sendedAt: new Date().toISOString(),
      });

      // Send push notification for credits added
      if (clientData?.fcmToken) {
        await axios.post(`${API_URL}/push/send/`, {
          authToken: process.env.REACT_APP_AUTH_KEY,
          tokens: [clientData?.fcmToken],
          messageBody: `${creditsToAdd} credits have been added to your account. Your new balance is ${
            (clientData?.package?.remaining ?? 0) + Number(creditsToAdd)
          } credits. Valid till: ${
            validTill ? new Date(validTill).toLocaleString() : "-"
          }`,
          messageTitle: "Credits Added",
          imageURL: "",
          data: {
            type: "credits_added",
            clientId: clientId,
            timestamp: new Date().toISOString(),
          },
        });
      }

      setClientData((prev) => ({
        ...prev,
        package: {
          ...prev.package,
          total: prev.package.total + Number(creditsToAdd),
          remaining: prev.package.remaining + Number(creditsToAdd),
          validTill: validTill
            ? new Date(validTill).toISOString()
            : prev.package.validTill,
        },
      }));
    } catch (error) {
      setError("Failed to add credits");
    } finally {
      setIsProcessing(false);
      setIsCreditsModalOpen(false);
      setCreditsToAdd(0);
      setValidTill("");
    }
  };

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    setIsProcessing(true);
    try {
      const uid = clientData?.id;
      if (!uid) throw new Error("User UID not found");
      // Send push notification with required body parameters
      await axios.post(`${API_URL}/push/send/`, {
        authToken: process.env.REACT_APP_AUTH_KEY,
        tokens: [clientData?.fcmToken], // Array of FCM tokens
        messageBody: messageText,
        messageTitle: "Message from Admin",
        imageURL: "",
        data: {
          type: "admin_message",
          clientId: clientId,
          timestamp: new Date().toISOString(),
        },
      });

      // Also save to Firebase Realtime Database for notification history
      await push(ref(rtdb, `users/${uid}/notifications`), {
        message: messageText,
        from: "Admin",
        isSeened: false,
        sendedAt: new Date().toISOString(),
      });

      setMessageText("");
      setIsMessageModalOpen(false);
      // Show success message or refresh data if needed
    } catch (err) {
      setError("Failed to send message");
    } finally {
      setIsProcessing(false);
    }
  };

  // Get current notifications
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification =
    indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(
    indexOfFirstNotification,
    indexOfLastNotification
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(notifications.length / notificationsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="client-info-container error-message1"
        style={{ marginTop: "100px" }}
      >
        Error: {error}
      </div>
    );
  }

  return (
    <div className="client-info-container">
      <h1>Client Information</h1>

      <div className="action-buttons">
        {clientData?.userData?.isBlocked ? (
          <button
            className="action-btn unblock styled-btn"
            onClick={() => setIsBlockModalOpen(true)}
          >
            Unblock User
          </button>
        ) : (
          <button
            className="action-btn block styled-btn"
            onClick={() => setIsBlockModalOpen(true)}
          >
            Block User
          </button>
        )}
        <button
          className="action-btn add-credits styled-btn"
          onClick={() => setIsCreditsModalOpen(true)}
        >
          Add Credits
        </button>
        <button
          className="action-btn msg-btn styled-btn"
          onClick={() => setIsMessageModalOpen(true)}
        >
          Send Message
        </button>
      </div>

      <div className="info-section">
        <h2>Business Details</h2>
        <div className="info-grid">
          <div className="info-item">
            <strong>Business Name:</strong>
            <p>{clientData?.userData?.businessName ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Contact Person:</strong>
            <p>{clientData?.userData?.contactName ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Email:</strong>
            <p>{clientData?.userData?.email ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Contact Number:</strong>
            <p>{clientData?.userData?.contactNumber ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>User ID:</strong>
            <p>{clientData?.userData?.preferredUserID ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Address:</strong>
            <p>{clientData?.userData?.businessAddress ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Coordinates:</strong>
            <p>
              Lat: {clientData?.userData?.businessCordinates?.latitude ?? ""},
              Long: {clientData?.userData?.businessCordinates?.longitude ?? ""}
            </p>
          </div>
        </div>
      </div>

      <div className="package-section">
        <h2>Package Information</h2>
        <div className="info-grid">
          <div className="info-item">
            <strong>Package Name:</strong>
            <p>{clientData?.package?.name ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Total Credits:</strong>
            <p>{clientData?.package?.total ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Remaining Credits:</strong>
            <p>{clientData?.package?.remaining ?? ""}</p>
          </div>
          <div className="info-item">
            <strong>Valid Until:</strong>
            <p>
              {clientData?.package?.createdAt
                ? new Date(clientData.package.createdAt).toLocaleDateString()
                : ""}
            </p>
          </div>
        </div>
      </div>

      {/* Display Notifications with Pagination */}
      <div className="notification-section">
        <h2>Notifications</h2>
        {notifications.length > 0 ? (
          <>
            <ul>
              {currentNotifications.map((notification) => (
                <li key={notification.id}>
                  <strong>{notification.from}:</strong>{" "}
                  <div className="notification-message">
                    {notification.message}
                  </div>
                  <small>
                    {new Date(notification.sendedAt).toLocaleString()}
                  </small>
                </li>
              ))}
            </ul>
            {notifications.length > notificationsPerPage && (
              <>
                <div className="notification-pagination">
                  <button
                    className="pagination-button"
                    onClick={() =>
                      setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))
                    }
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>

                  {pageNumbers.map((number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`pagination-button ${
                        currentPage === number ? "active" : ""
                      }`}
                    >
                      {number}
                    </button>
                  ))}

                  <button
                    className="pagination-button"
                    onClick={() =>
                      setCurrentPage((prevPage) =>
                        Math.min(
                          prevPage + 1,
                          Math.ceil(notifications.length / notificationsPerPage)
                        )
                      )
                    }
                    disabled={
                      currentPage ===
                      Math.ceil(notifications.length / notificationsPerPage)
                    }
                  >
                    Next
                  </button>
                </div>
                <div className="pagination-info">
                  Showing {indexOfFirstNotification + 1}-
                  {Math.min(indexOfLastNotification, notifications.length)} of{" "}
                  {notifications.length} notifications
                </div>
              </>
            )}
          </>
        ) : (
          <p>No notifications found.</p>
        )}
      </div>

      {/* Block/Unblock Modal */}
      {isBlockModalOpen && (
        <div className="modal-overlay center-modal">
          <div
            className={`modal-content block-modal-centered ${
              clientData?.userData?.isBlocked ? "unblock-modal" : "block-modal"
            }`}
          >
            <div className="modal-header">
              <h2 className="modal-title">
                {clientData?.userData?.isBlocked
                  ? "Unblock User"
                  : "Block User"}
              </h2>
              <button
                className="modal-close styled-btn"
                onClick={() => setIsBlockModalOpen(false)}
                disabled={isProcessing}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <p className="modal-message">
                Are you sure you want to{" "}
                {clientData?.userData?.isBlocked ? "unblock" : "block"} this
                user? This action will{" "}
                {clientData?.userData?.isBlocked
                  ? "restore their access to the platform"
                  : "prevent them from accessing the platform"}
                .
              </p>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary styled-btn"
                onClick={() => setIsBlockModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                className={`btn-primary styled-btn ${
                  isProcessing ? "loading" : ""
                }`}
                onClick={
                  clientData?.userData?.isBlocked
                    ? handleUnblockUser
                    : handleBlockUser
                }
                disabled={isProcessing}
              >
                {isProcessing ? "Processing..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Credits Modal */}
      {isCreditsModalOpen && (
        <div className="modal-overlay center-modal">
          <div className="modal-content credits-modal-centered">
            <div className="modal-header">
              <h2 className="modal-title">Add Credits</h2>
              <button
                className="modal-close styled-btn"
                onClick={() => setIsCreditsModalOpen(false)}
                disabled={isProcessing}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="credits">Number of Credits to Add</label>
                <input
                  id="credits"
                  type="number"
                  value={creditsToAdd}
                  onChange={(e) => setCreditsToAdd(e.target.value)}
                  min="1"
                  max="10000"
                  placeholder="Enter credits amount"
                  className="form-control"
                  disabled={isProcessing}
                />
              </div>
              <div className="form-group">
                <label htmlFor="validTill">Valid Till (ISO format)</label>
                <input
                  id="validTill"
                  type="datetime-local"
                  value={validTill}
                  onChange={(e) => setValidTill(e.target.value)}
                  className="form-control"
                  disabled={isProcessing}
                />
                <small style={{ fontSize: "0.85rem", color: "#64748b" }}>
                  Example: 2029-07-25T10:04
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary styled-btn"
                onClick={() => setIsCreditsModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                className={`btn-primary styled-btn ${
                  isProcessing ? "loading" : ""
                }`}
                onClick={handleAddCredits}
                disabled={isProcessing || creditsToAdd <= 0 || !validTill}
              >
                {isProcessing ? "Adding..." : "Add Credits"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Send Message Modal */}
      {isMessageModalOpen && (
        <div className="modal-overlay center-modal">
          <div className="modal-content message-modal-centered">
            <div className="modal-header">
              <h2 className="modal-title">Send Message</h2>
              <button
                className="modal-close styled-btn"
                onClick={() => setIsMessageModalOpen(false)}
                disabled={isProcessing}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message here..."
                  rows={5}
                  className="form-control"
                  disabled={isProcessing}
                  maxLength={500}
                ></textarea>
                <small
                  style={{
                    fontSize: "0.85rem",
                    color: "#64748b",
                    marginTop: "0.5rem",
                  }}
                >
                  {messageText.length}/500 characters
                </small>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn-secondary styled-btn"
                onClick={() => setIsMessageModalOpen(false)}
                disabled={isProcessing}
              >
                Cancel
              </button>
              <button
                className={`btn-primary styled-btn ${
                  isProcessing ? "loading" : ""
                }`}
                onClick={handleSendMessage}
                disabled={isProcessing || !messageText.trim()}
              >
                {isProcessing ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ClientInfo;
