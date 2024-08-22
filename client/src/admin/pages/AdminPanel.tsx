import SideBar from "../components/SideBar";
import { Route, Routes } from "react-router-dom";
import PersonalProfile from "../../components/PersonalProfile";
import DashBoard from "../components/DashBoard";
import Charts from "../components/Charts";

function AdminPanel() {
  return (
    <>
      <div style={{ display: "flex", height: "100vh" }}>
        <SideBar />
        <div style={{ flex: 1, padding: "20px", backgroundColor: "#0e0a29" }}>
          <Routes>
            <Route path="profile" element={<PersonalProfile />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="charts" element={<Charts />} />
          </Routes>
        </div>
      </div>
    </>
  );
}

export default AdminPanel;
