import React, { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { IoMdPerson } from "react-icons/io";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import "./addAdmin.css";

const AddAdmin = () => {
  const [adminData, setAdminData] = useState({
    name: "",
    email: "",
    role: "Admin",
    password: "",
    image: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      const adminRef = doc(db, "admins", id);
      getDoc(adminRef).then((snapshot) => {
        if (snapshot.exists()) {
          setAdminData(snapshot.data());
        }
      });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdminData({ ...adminData, image: URL.createObjectURL(file) });
    }
  };

  const handleSave = async () => {
    if (id) {
      const adminRef = doc(db, "admins", id);
      await setDoc(adminRef, adminData);
    } else {
      const newAdminRef = doc(collection(db, "admins"));
      await setDoc(newAdminRef, adminData);
    }
    navigate("/dashboard/admins");
  };

  return (
    <div className="add-admin-container">
      <h1 className="page-title">{id ? "Edit Admin" : "Add Admin"}</h1>

      <hr />

      <IoArrowBackCircleSharp
        className="return-icon"
        onClick={() => navigate(-1)}
      />

      <div className="admin-image-section">
        <div className="image-placeholder">
          {adminData.image ? (
            <img src={adminData.image} alt="Profile Preview" />
          ) : (
            <span className="image-icon">
              <IoMdPerson />
            </span>
          )}
        </div>
        <input
          type="file"
          className="file-input"
          onChange={handleImageUpload}
        />
        <p className="image-guidelines">
          SVG, PNG, JPG or GIF (MAX. 800x400px). The image size must be less
          than 5MB.
        </p>
      </div>
      <form className="admin-form">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="name">
              Name <span>*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Enter Your Name"
              value={adminData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">
              Email <span>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter Your Email"
              value={adminData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="role">
              Select Role <span>*</span>
            </label>
            <select
              id="role"
              name="role"
              value={adminData.role}
              onChange={handleChange}
              required
            >
              <option value="Admin">Admin</option>
              <option value="Editor">Editor</option>
              <option value="Viewer">Viewer</option>
            </select>
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="password">
              Password <span>*</span>
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Your Password"
              value={adminData.password}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="button" className="addadmin-btn" onClick={handleSave}>
          {id ? "Update Admin" : "Add Admin"}
        </button>
      </form>
    </div>
  );
};

export default AddAdmin;
