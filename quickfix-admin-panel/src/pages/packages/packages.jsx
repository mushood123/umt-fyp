import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { ref, onValue, set, push } from "firebase/database";
import { rtdb } from "../../firebase/config";
import "./packages.css";

Modal.setAppElement("#root"); // Avoids accessibility warnings

function Packages() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState({});
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddingNew, setIsAddingNew] = useState(false);

  // Load package from Firebase Realtime Database
  useEffect(() => {
    const packageRef = ref(rtdb, "initialPackageForAll");

    const unsubscribe = onValue(
      packageRef,
      (snapshot) => {
        try {
          const data = snapshot.val();
          if (data) {
            // Get the first (and only) package
            const packageKey = Object.keys(data)[0];
            const packageData = {
              id: packageKey,
              ...data[packageKey],
            };
            setPackages([packageData]);
          } else {
            // If no data exists, create default package
            const defaultPackage = {
              title: "Pay As You Go",
              description: "Pay As You Go",
              totalCalls: "5",
              terms:
                "1-One Ac shall be fixed per Call. 2-Maximum Technician time is 2Hrs. 3-Client to provide ladder for more than 4 meter heights.",
            };

            // Save default package to database
            const newPackageRef = push(packageRef);
            set(newPackageRef, defaultPackage)
              .then(() => {
                console.log("Default package created successfully");
              })
              .catch((error) => {
                console.error("Error creating default package:", error);
                setError("Failed to create default package");
              });
          }
          setLoading(false);
        } catch (error) {
          console.error("Error loading package:", error);
          setError("Failed to load package");
          setLoading(false);
        }
      },
      (error) => {
        console.error("Firebase error:", error);
        setError("Database connection error");
        setLoading(false);
      }
    );

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  const handleEditClick = () => {
    if (packages.length > 0) {
      setEditingPackage(packages[0]);
      setIsAddingNew(false);
      setModalIsOpen(true);
    }
  };

  const handleCreatePackage = () => {
    setEditingPackage({
      title: "",
      description: "",
      totalCalls: "",
      terms: "",
    });
    setIsAddingNew(true);
    setModalIsOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditingPackage({ ...editingPackage, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      if (isAddingNew) {
        // Create new package (replace any existing one)
        const packageRef = ref(rtdb, "initialPackageForAll");
        const packageData = {
          title: editingPackage.title,
          description: editingPackage.description,
          totalCalls: editingPackage.totalCalls,
          terms: editingPackage.terms,
        };

        // Clear existing data and set new package
        await set(packageRef, null);
        const newPackageRef = push(packageRef);
        await set(newPackageRef, packageData);
      } else {
        // Update existing package
        const packageRef = ref(
          rtdb,
          `initialPackageForAll/${editingPackage.id}`
        );
        const packageData = {
          title: editingPackage.title,
          description: editingPackage.description,
          totalCalls: Number(editingPackage.totalCalls),
          terms: editingPackage.terms,
        };

        await set(packageRef, packageData);
      }

      setModalIsOpen(false);
      setIsAddingNew(false);
    } catch (error) {
      setError("Failed to save package");
    }
  };

  return (
    <div className="packages-container">
      <div className="content-wrapper">
        <div className="header-section">
          <h1 className="page-title">Package Management</h1>
        </div>

        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading packages...</p>
          </div>
        )}

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="packages-content">
            {packages.length === 0 ? (
              <div className="empty-state">
                <h3>No Package Found</h3>
                <p>Create your first package to get started.</p>
                <button
                  onClick={handleCreatePackage}
                  className="btn btn-primary"
                >
                  Create Package
                </button>
              </div>
            ) : (
              <div className="package-list">
                {packages.map((pkg) => (
                  <div key={pkg.id} className="package-item">
                    <div className="package-header">
                      <button
                        onClick={handleEditClick}
                        className="btn btn-small btn-secondary edit-btn-top"
                      >
                        Edit
                      </button>
                    </div>

                    <div className="package-body">
                      <div className="package-detail">
                        <label>Title:</label>
                        <h3 className="package-title-display">{pkg.title}</h3>
                      </div>

                      <div className="package-detail">
                        <label>Description:</label>
                        <p className="package-description-display">{pkg.description}</p>
                      </div>

                      <div className="package-detail">
                        <label>Total Calls:</label>
                        <span className="detail-value">{pkg.totalCalls}</span>
                      </div>

                      <div className="package-detail">
                        <label>Terms and Conditions:</label>
                        <p className="terms-text">{pkg.terms}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Package Modal"
        className="modal"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>{isAddingNew ? "Create Package" : "Edit Package"}</h3>
            <button
              onClick={() => setModalIsOpen(false)}
              className="btn-close"
            >
              ×
            </button>
          </div>

          <div className="modal-body">
            <div className="form-group">
              <label>Package Title</label>
              <input
                type="text"
                name="title"
                value={editingPackage.title || ""}
                onChange={handleInputChange}
                placeholder="Enter package title"
              />
            </div>

            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                name="description"
                value={editingPackage.description || ""}
                onChange={handleInputChange}
                placeholder="Enter package description"
              />
            </div>

            <div className="form-group">
              <label>Total Calls</label>
              <input
                type="number"
                name="totalCalls"
                value={editingPackage.totalCalls || ""}
                onChange={handleInputChange}
                placeholder="Enter total number of calls"
                min="1"
              />
            </div>

            <div className="form-group">
              <label>Terms and Conditions</label>
              <textarea
                name="terms"
                value={editingPackage.terms || ""}
                onChange={handleInputChange}
                placeholder="Enter terms and conditions"
                rows="4"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button
              onClick={() => setModalIsOpen(false)}
              className="btn btn-secondary"
            >
              Cancel
            </button>
            <button onClick={handleUpdate} className="btn btn-primary">
              {isAddingNew ? "Create Package" : "Update Package"}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Packages;
