import React from "react";
import { Link, Outlet } from "react-router-dom";
import useAdmin from "../../hooks/useAdmin";
import auth from "../../firebase.init";
import { useAuthState } from "react-firebase-hooks/auth";

const Dashboard = () => {
  const [user] = useAuthState(auth);
  const [admin] = useAdmin(user);
  return (
    <div className="drawer drawer-mobile">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mt-8">
        <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          {admin && (
            <li>
              <Link to="/dashboard/add-a-part">Add a part</Link>
            </li>
          )}
          {!admin && (
            <li>
              <Link to="/dashboard/my-orders">My Orders</Link>
            </li>
          )}
          {!admin &&<li>
            <Link to="/dashboard/add-a-review">Add A Review</Link>
          </li>}
          <li>
            <Link to="/dashboard/">My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
