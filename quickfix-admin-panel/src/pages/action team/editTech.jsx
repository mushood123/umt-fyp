import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { IoArrowBackCircleSharp } from "react-icons/io5";
import API_URL from "../../api/config";
import "./editTech.css";

function AddTechnician() {
  const [technician, setTechnician] = useState({
    name: "",
    email: "",
    phone: "",
    designation: "",
  });
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchTechnician = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/users/technicians/${id}`
          );
          setTechnician(response.data.technician);
        } catch (error) {
          console.error("Error fetching technician:", error);
        }
      };
      fetchTechnician();
    }
  }, [id]);

  const handleChange = (e) => {
    setTechnician({ ...technician, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (id) {
        await axios.put(`${API_URL}/users/technicians/${id}`, technician);
      } else {
        await axios.post(`${API_URL}/users/technicians/add`, technician);
      }
      navigate("/dashboard/actionTeam");
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="add-technician-container">
      <h1>{id ? "Edit Technician" : "Add Technician"}</h1>
      <hr />

      <IoArrowBackCircleSharp
        className="return-icon"
        onClick={() => navigate(-1)}
      />

      <form onSubmit={handleSubmit} className="add-technician-form">
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={technician.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={technician.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Phone Number:
          <input
            type="tel"
            name="phone"
            value={technician.phone}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Designation:
          <select
            className="dropdown"
            name="designation"
            value={technician.designation}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select a designation
            </option>
            <option value="Heating and Cooling System">
              Heating and Cooling System
            </option>
            <option value="Electrical">Electrical</option>
            <option value="Plumbering">Plumbering</option>
            <option value="Drainage">Drainage</option>
          </select>
        </label>

        <label>
          Password:
          <input
            type="password"
            name="password"
            value={technician.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit">{id ? "Update" : "Add"} </button>
      </form>
    </div>
  );
}

export default AddTechnician;
