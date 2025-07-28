import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { auth } from "./firebase/config";
import Login from "./login/login";
import Sidebar from "./pages/dashboard/sidebar";
import Dashboard from "./pages/dashboard/Dashboard";
import ClientRequests from "./pages/client Requests/clientRequests";
import ClientAnnoucements from "./pages/Client Announcements/clientAnnoucements";
import Packages from "./pages/packages/packages";
import ContactUs from "./pages/contact us/contactUs";
import OurClients from "./pages/our clients/ourClients";
import ActionTeam from "./pages/action team/actionTeam";
import Admins from "./pages/admins/admins";
import Payments from "./pages/payments/payments";
import AddAdmin from "./pages/admins/addAdmin";
import AddTechnicians from "./pages/action team/editTech";
import Loading from "./components/loading/loading";
import "./App.css";
import Header from "./pages/dashboard/Header";
import ClientInfo from "./pages/our clients/clientInfo";
import useSocket from "./lib/useSocket";
import toast, { Toaster } from "react-hot-toast";
import TechnicianInfo from "./pages/action team/technicianInfo";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const { socket } = useSocket("admin");

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const location = useLocation();

  useEffect(() => {
    if (socket) {
      socket?.on("notification", (message) => {
        toast.success(`🚨 ${message}`);
      });
    }

    return () => socket?.disconnect();
  }, [socket]);
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  const isLoginPage = location.pathname === "/";

  return (
    <div className="app-layout">
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
          },
        }}
      />
      {!isLoginPage && isLoggedIn && (
        <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      )}
      <div className="main-content">
        {!isLoginPage && isLoggedIn && <Header />}
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn ? (
            <>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route
                path="/dashboard/clientRequests"
                element={<ClientRequests />}
              />
              <Route
                path="/dashboard/clientAnnoucements"
                element={<ClientAnnoucements />}
              />
              <Route path="/dashboard/packages" element={<Packages />} />
              <Route path="/dashboard/contactUs" element={<ContactUs />} />
              <Route path="/dashboard/ourClients" element={<OurClients />} />
              <Route
                path="/dashboard/clientInfo/:id"
                element={<ClientInfo />}
              />
              <Route path="/dashboard/actionTeam" element={<ActionTeam />} />
              <Route
                path="/dashboard/addTechnician"
                element={<AddTechnicians />}
              />
              <Route
                path="/dashboard/addTechnician/:id"
                element={<AddTechnicians />}
              />
              <Route
                path="/dashboard/technicianInfo/:id"
                element={<TechnicianInfo />}
              />
              <Route path="/dashboard/admins" element={<Admins />} />
              <Route path="/dashboard/payments" element={<Payments />} />
              <Route path="/dashboard/addAdmin" element={<AddAdmin />} />
              <Route path="/dashboard/addAdmin/:id" element={<AddAdmin />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/" replace />} />
          )}
        </Routes>
      </div>
    </div>
  );
}

function Root() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default Root;
