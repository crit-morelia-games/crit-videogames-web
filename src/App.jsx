import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { SignIn } from "./pages/Auth";
import { RequireAuth, useIsAuthenticated } from "react-auth-kit";
import Base from "./components/layout/Base";

function App() {
  const isAuthenticated = useIsAuthenticated();
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route
        path="/dashboard"
        element={
          isAuthenticated() ? (
            <Navigate to="/dashboard/home" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
      <Route
        path="/dashboard/*"
        element={
          <RequireAuth loginPath="/">
            <Base />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

export default App;
