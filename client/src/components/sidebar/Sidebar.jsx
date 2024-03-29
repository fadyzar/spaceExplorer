
import React, { useState } from "react";
import "tailwindcss/tailwind.css";
import "./Sidebar.css";
import { useLogInContext } from "../context/LoginContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from 'react-router-dom';

const Sidebar = ({ onToggleApod,onShowAsteroidsClick,showDonki,onShowNasaLibraryClick  }) => {
  const [submenuHidden, setSubmenuHidden] = useState(false);
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const { setCurrentUser, currentUser } = useLogInContext();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setSubmenuHidden(!submenuHidden);
  };

  const toggleSidebar = () => {
    setSidebarHidden(!sidebarHidden);
  };

  function handleLogOut() {
    localStorage.clear();
    setCurrentUser();
    navigate("/");
  }
  function showPlanets() {
    
    
    navigate("/explore");
  }

  function showIss() {
    
    
    navigate("/iss");
  }

  function spaceXevents(){
    navigate("/spaceevent")
  }

  function nasaLibrary(){
    navigate("/nasalibrary")
  }

  function forum(){
    navigate("/forum")
  }



  return (
    <div className="bg-blue-600 sidebar-container">
      <span
        className="absolute text-white text-4xl top-5 left-4 cursor-pointer"
        onClick={toggleSidebar}
      ></span>
      <div
        className={`sidebar fixed top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gray-900 ${
          sidebarHidden ? "hidden" : ""
        }`}
      >
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <h1 className="font-bold text-gray-200 text-[15px] ml-3 lawyer-title">
              SPACE EXPLORER
            </h1>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={handleLogOut}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Logout <LogoutIcon className="logout-icon" />
            </span>
          </div>
        </div>
        
       
        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={forum}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Space Forum
            </span>
          </div>
        </div>

        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={showPlanets}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Planets
            </span>
          </div>
        </div>



        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={showIss}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              ISS Location
            </span>
          </div>
        </div>

        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={nasaLibrary}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Show NASA Library
            </span>
          </div>
        </div>

        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={spaceXevents}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              SpaceX Events
            </span>
          </div>
        </div>
       
        <div
          className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
          onClick={onToggleApod}
        >
          <div className="flex justify-between w-full items-center">
            <span className="text-[15px] ml-4 text-gray-200 font-bold">
              Toggle APOD
            </span>
          </div>
        </div>
         {/* Show Asteroids button */}
      <div
        className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onClick={onShowAsteroidsClick}
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Show Asteroids
          </span>
          <span
            className={`text-sm ${submenuHidden ? "rotate-0" : ""}`}
          ></span>
        </div>
      </div>
      
       
      <div
        className="sidebar-container p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white"
        onClick={showDonki} // Update this line to call showDonki function
      >
        <div className="flex justify-between w-full items-center">
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Show DONKI
          </span>
        </div>
      </div>


    

   
      
      
      
      
      
      
      
      </div>
    </div>
    
   
 
    
  );
};

export default Sidebar;
