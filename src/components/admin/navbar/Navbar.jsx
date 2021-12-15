import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
   return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
         <div className="container-fluid">
            <a className="navbar-brand" href="/">
               <strong>Cachimbos</strong>
            </a>

            <div className="d-flex justify-content-end">
               <ul className="navbar-nav me-auto">
                  <li className="nav-item">
                     <NavLink exact to="/" className="nav-link">
                        Orders
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink exact to="/menu" className="nav-link">
                        Food
                     </NavLink>
                  </li>
                  <li className="nav-item">
                     <NavLink exact to="/recipes" className="nav-link">
                        Recipes
                     </NavLink>
                  </li>
               </ul>
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
