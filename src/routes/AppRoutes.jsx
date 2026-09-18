import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Layout from "../layouts/Layout.jsx";
import Login from "../pages/Login/Login.jsx";
import Overview from "../pages/Overview/HomePage.jsx";
import MyProfileForm from "../pages/settings/Profile/MyProfileForm.jsx";
import SettingsGrid from "../pages/settings/GridView/SettingsGrid.jsx";
import UserManagement from "../pages/settings/UserManagement/UserManagementTable.jsx";
import UserCreationForm from "../pages/settings/UserManagement/UserCreationForm.jsx";
import FormModuleListView from "../pages/settings/FormModule/FormModuleListView.jsx";
import FormModuleForm from "../pages/settings/FormModule/FormModuleForm.jsx";
import RoleListView from "../pages/settings/RoleManagement/RoleListView.jsx";
import RoleCreationForm from "../pages/settings/RoleManagement/RoleCreationForm.jsx";
import DropdownMasterListView from "../pages/settings/DropdownMaster/DropdownMasterListTable.jsx";
import DropdownMasterForm from "../pages/settings/DropdownMaster/DropdownMasterForm.jsx";
import DropdownCategoryListView from "../pages/settings/DropdownMaster/DropdownCategoryListTable.jsx";
import DropdownCategoryForm from "../pages/settings/DropdownMaster/DropdownCategoryForm.jsx";

 



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
        <Route path="/settings" element={<SettingsGrid />} />
        <Route path="/settings/user-management/list" element={<UserManagement />} />
        <Route path="/settings/user-management/add-user" element={<UserCreationForm />} />
        <Route path="/settings/role-management/list" element={<RoleListView />} />
        <Route path="/settings/role-management/add-role" element={<RoleCreationForm />} />
        <Route path="/settings/form-module/list" element={<FormModuleListView />} />
        <Route path="/settings/form-module/add-form-module" element={<FormModuleForm />} />
        <Route path="/settings/dropdown-master/list" element={<DropdownMasterListView />} />
        <Route path="/settings/dropdown-master/add-dropdown-master" element={<DropdownMasterForm />} />
        <Route path="/settings/dropdown-category/list" element={<DropdownCategoryListView />} />
        <Route path="/settings/dropdown-category/add-dropdown-category" element={<DropdownCategoryForm />} />

        



      </Route>

      {/* Koi galat URL daale to home/login pe bhej do */}
      <Route
        path="*"
        element={<Navigate to={isLoggedIn ? "/" : "/login"} replace />}
      />
    </Routes>
  );
}