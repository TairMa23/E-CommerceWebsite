import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import BarChartRoundedIcon from "@mui/icons-material/BarChartRounded";
function SideBar() {
  return (
    <div
      style={{ display: "flex", backgroundColor: "#1a153d", height: "100vh" }}
    >
      <Sidebar style={{ height: "100vh", backgroundColor: "#1a153d" }}>
        <Menu
          className="side-bar"
          menuItemStyles={{
            button: {
              // the active class will be added automatically by react router
              // so we can use it to style the active menu item
              [`&.active`]: {
                backgroundColor: "#13395e",
                color: "#b6c8d9",
              },
            },
          }}
        >
          <MenuItem
            icon={<GridViewRoundedIcon />}
            component={<Link to="dashboard" />}
          >
            {" "}
            DashBoard
          </MenuItem>
          <MenuItem
            icon={<AccountCircleRoundedIcon />}
            component={<Link to="profile" />}
          >
            {" "}
            Profile
          </MenuItem>
          <MenuItem
            icon={<BarChartRoundedIcon />}
            component={<Link to="charts" />}
          >
            {" "}
            Charts
          </MenuItem>
        </Menu>
      </Sidebar>{" "}
    </div>
  );
}

export default SideBar;
