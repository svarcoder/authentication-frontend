import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardHome from "./dashboard/Dashboard";
import ForgotPassword from "./password/ForgotPassword";
import UpdatePassword from "./password/UpdatePassword";
import Leads from "./lead/Leads";
import LoginMain from "./login/LoginMain";
import Header from "./dashboard/Header";
import Footer from "./dashboard/Footer";
import PrivateRoute from "./PrivateRoute";

const HomeRoute: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
      <Header />
      <ToastContainer />
        <Routes>
          <Route path="/" element={<DashboardHome />} />
          <Route path="*" element={<DashboardHome />} />
          <Route path="/login" element={<LoginMain />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<UpdatePassword />} />
          <Route element={<PrivateRoute />}>
          <Route path="/lead" element={<Leads />} />
        </Route>
        </Routes>
      </Router>
      <Footer />
    </AuthProvider>
  );
};

export default HomeRoute;
