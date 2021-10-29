import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
         <div className="container-fluid">
            <h3 className="text-info">
               <strong>CACHIMBOS Restaurant</strong>
            </h3>
            <ul className="nav nav-tabs">
               <li className="nav-item">
                  <NavLink exact to="/" className="nav-link">
                     Home
                  </NavLink>
               </li>
               <li className="nav-item">
                  <NavLink to="/orders" className="nav-link">
                     Orders
                  </NavLink>
               </li>
            </ul>
         </div>
      </nav>
   );
};

export default Navbar;
