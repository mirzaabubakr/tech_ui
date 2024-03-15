import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "../layout/main/main";
import Dashboard from "../pages/dashboard";
import Login from "../components/login/login";

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="main" element={<Main />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default AppRoutes;
