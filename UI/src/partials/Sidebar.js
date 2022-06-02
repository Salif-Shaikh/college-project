import React, { useEffect, useRef } from "react";
import { useLocation, Link } from "react-router-dom";
import {
  buildingIcon,
  collection,
  documentReport,
  projectIcon,
  switchVertical,
  // uploadIcon,
} from "./icons";

function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const location = useLocation();
  const { pathname } = location;

  // const validNavs = [
  //   "/main/workday",
  //   "/main/saleLeads",
  //   "/main/resaleLeads",
  //   "/main/rentalLeads",
  //   "/main/plotLeads",
  //   "/main/reports",
  // ];

  const trigger = useRef(null);
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (
        !sidebarOpen ||
        sidebar.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setSidebarOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!sidebarOpen || keyCode !== 27) return;
      setSidebarOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="lg:w-64">
      {/* Sidebar backdrop (mobile only) */}
      <div
        className={`fixed inset-0 bg-gray-900 bg-opacity-30 z-40 lg:hidden lg:z-auto transition-opacity duration-200 ${
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
      ></div>

      {/* Sidebar */}
      <div
        id="sidebar"
        ref={sidebar}
        className={`absolute z-40 left-0 top-0 lg:static lg:left-auto lg:top-auto lg:translate-x-0 transform h-screen overflow-y-scroll lg:overflow-y-auto no-scrollbar w-64 flex-shrink-0 bg-gray-800 p-4 transition-transform duration-200 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-64"
        }`}
      >
        {/* Sidebar header */}
        <div className="flex justify-between mb-10 pr-3 sm:px-2">
          {/* Close button */}
          <button
            ref={trigger}
            className="lg:hidden text-gray-500 hover:text-gray-400"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            aria-controls="sidebar"
            aria-expanded={sidebarOpen}
          >
            <span className="sr-only">Close sidebar</span>
            <svg
              className="w-6 h-6 fill-current"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.7 18.7l1.4-1.4L7.8 13H20v-2H7.8l4.3-4.3-1.4-1.4L4 12z" />
            </svg>
          </button>
          {/* Logo */}
          {/* <Link to="/main/" className="block"> */}
          {projectIcon}
          {/* </Link> */}
        </div>

        {/* Links */}
        <div>
          <h3 className="text-xs uppercase text-gray-500 font-semibold pl-3">
            Pages
          </h3>
          <ul className="mt-3">
            {/* Workday*/}
            {/* <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/workday" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/workday"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/workday" && "hover:text-gray-200"
                }`}
              >
                <div className="flex flex-grow">
                  {switchVertical}
                  <span className="text-sm font-medium">Workday</span>
                </div>
              </Link>
            </li> */}
            {/* Sale leads */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/saleLeads" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/saleLeads"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/saleLeads" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {collection}
                    <span className="text-sm font-medium">Sale Leads</span>
                  </div>
                </div>
              </Link>
            </li>
            {/* Resale leads */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/resaleLeads" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/resaleLeads"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/resaleLeads" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {collection}
                    <span className="text-sm font-medium">Resale Leads</span>
                  </div>
                </div>
              </Link>
            </li>
            {/* Rental leads */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/rentalLeads" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/rentalLeads"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/rentalLeads" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {collection}
                    <span className="text-sm font-medium">Rental Leads</span>
                  </div>
                </div>
              </Link>
            </li>
            {/* Plot Leads */}
            <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/plotLeads" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/plotLeads"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/plotLeads" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {collection}
                    <span className="text-sm font-medium">Plot Leads</span>
                  </div>
                </div>
              </Link>
            </li>
            {/* Reports */}
            {/* <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/reports" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/reports"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/reports" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {documentReport}
                    <span className="text-sm font-medium">Reports</span>
                  </div>
                </div>
              </Link>
            </li> */}
            {/*<li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/uploads" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/uploads"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/uploads" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {uploadIcon}
                    <span className="text-sm font-medium">Uploads</span>
                  </div>
                </div>
              </Link>
              </li>*/}
            {/* <li
              className={`px-3 py-2 rounded-sm mb-0.5 last:mb-0 ${
                pathname === "/main/reports" && "bg-gray-900"
              }`}
            >
              <Link
                to="/main/postedProp"
                className={`block text-gray-200 hover:text-white transition duration-150 ${
                  pathname === "/main/postedProp" && "hover:text-gray-200"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex flex-grow">
                    {collection}
                    <span className="text-sm font-medium">
                      Posted Properties
                    </span>
                  </div>
                </div>
              </Link>
            </li> */}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
