import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/Layout.jsx";
import Login from "../pages/Login/Login.jsx";
import Overview from "../pages/Overview/HomePage.jsx";
import MyProfileForm from "../pages/settings/Profile/MyProfileForm.jsx";

export default function AppRoutes({ isLoggedIn, onLogin, onLogout }) {
  return (
    <Routes>
      {/* Public route */}
      <Route
        path="/login"
        element={
          isLoggedIn ? (
            <Navigate to="/" replace />
          ) : (
            <Login onLogin={onLogin} />
          )
        }
      />

      {/* Protected routes - sab Layout ke andar */}
      <Route
        element={
          <ProtectedRoute isLoggedIn={isLoggedIn}>
            <Layout onLogout={onLogout} />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Overview />} />
        <Route path="/profile" element={<MyProfileForm />} />
        <Route path="/settings" element={<MyProfileForm />} />
         
      </Route>

      {/* Koi galat URL daale to home/login pe bhej do */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}