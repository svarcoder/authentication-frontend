import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const DashboardHome: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="dashboard">
      <main className="dashboard__content">
        <h1>
          {isAuthenticated
            ? "Welcome to the Dashboard"
            : "Please login for more enjoy"}
        </h1>
        <p>
          This is the dashboard home page. Use the navigation links above to
          browse the site.
        </p>
        {isAuthenticated && (
          <button onClick={() => navigate("/lead")}>Lead</button>
        )}
      </main>
    </div>
  );
};

export default DashboardHome;
