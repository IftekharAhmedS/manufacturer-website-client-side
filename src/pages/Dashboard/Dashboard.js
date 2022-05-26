import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="drawer drawer-mobile">
      <input id="sidebar" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content mt-8">
          <Outlet></Outlet>
      </div>
      <div className="drawer-side">
        <label htmlFor="sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
          <li>
            <Link to='/dashboard'>My Orders</Link>
          </li>
          <li>
            <Link to='/dashboard/add-a-review'>Add A Review</Link>
          </li>
          <li>
            <Link to='/dashboard/my-profile'>My Profile</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
