import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, get } from "firebase/database";
import Loading from "../../components/loading/loading";
import "./payments.css";

function AdminPaymentPage() {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [paymentWithUserData, setPaymentWithUserData] = useState([]);

  useEffect(() => {
    const db = getDatabase();
    const paymentRef = ref(db, "payments");

    const fetchUserData = async (userId) => {
      try {
        const userRef = ref(db, `users/${userId}/userData`);
        const snapshot = await get(userRef);
        return snapshot.val();
      } catch (error) {
        console.error(`Error fetching user data for ${userId}:`, error);
        return null;
      }
    };

    onValue(paymentRef, async (snapshot) => {
      try {
        const data = snapshot.val();
        const loadedPayments = [];

        for (let key in data) {
          const payment = { id: key, ...data[key] };
          const userData = await fetchUserData(key);
          loadedPayments.push({
            ...payment,
            userData,
          });
        }

        setPayments(loadedPayments.reverse());
        setError(null);
      } catch (error) {
        console.error("Error processing payments:", error);
        setError("Failed to load payments data");
      } finally {
        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="spinner-wrapper">
        <Loading />
      </div>
    );
  }

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="payment-container">
      <h2>Payment Details</h2>
      <table className="payment-table">
        <thead>
          <tr>
            <th>Payment ID</th>
            <th>Business Name</th>
            <th>Package Name</th>
            <th>Credits</th>
            <th>Remainings</th>
            <th>Status</th>
            <th>Payment Date</th>
            <th>Valid Till</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((pay) => (
            <tr key={pay.id}>
              <td>{pay.id}</td>
              <td>{pay.userData?.businessName || "N/A"}</td>
              <td>{pay.name || "N/A"}</td>
              <td>{pay.total || 0}</td>
              <td>{pay.remaining || 0}</td>
              <td className={`payment-status-${pay.status?.toLowerCase()}`}>
                {pay.status || "Pending"}
              </td>
              <td>
                {pay.timestamp
                  ? new Date(pay.timestamp).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                {pay.userData?.package?.validTill
                  ? new Date(
                      pay.userData.package.validTill
                    ).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminPaymentPage;
