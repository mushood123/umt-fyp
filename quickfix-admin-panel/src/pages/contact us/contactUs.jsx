import React, { useState } from "react";
import "./contactUs.css";
import Modal from "react-modal";

Modal.setAppElement("#root"); // Prevents screen reader issues

const ContactUs = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    register: "To register contract: 565656565656",
    actionTeam: "For Action Team: 8968678695",
  });
  const [tempInfo, setTempInfo] = useState(contactInfo);
  const [toggle, setToggle] = useState(false);

  const openModal = () => {
    setTempInfo(contactInfo);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleUpdate = () => {
    setContactInfo(tempInfo);
    closeModal();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempInfo({ ...tempInfo, [name]: value });
  };

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <div className="contact-box">
        <p>{contactInfo.register}</p>
        <p>{contactInfo.actionTeam}</p>
      </div>
      <button className="edit-btn" onClick={openModal}>
        Edit ✏️
      </button>

      <div className="toggle-section">
        <h3>24 Hours Time Slots ⏰</h3>
        <div
          className={`toggle-switch ${toggle ? "on" : "off"}`}
          onClick={handleToggle}
        >
          {toggle ? "ON" : "OFF"}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Contact Details</h2>
        <label>Contact Us</label>
        <input
          type="text"
          name="register"
          value={tempInfo.register}
          onChange={handleChange}
        />
        <input
          type="text"
          name="actionTeam"
          value={tempInfo.actionTeam}
          onChange={handleChange}
        />
        <button className="update-btn" onClick={handleUpdate}>
          Update
        </button>
      </Modal>
    </div>
  );
};

export default ContactUs;
