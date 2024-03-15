import { Outlet } from "react-router-dom";
import TopBar from "../topbar/Topbar";

export default function Main() {
  return (
    <div className="main-container">
      <TopBar />
      <div className="main">
        <Outlet />
      </div>
    </div>
  );
}
