import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Menu from "./pages/menu/Menu";
import Orders from "./pages/orders/Orders";
import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   return (
      <Router>
         <Navbar />
         <div className=".container-fluid p-4">
            <div className="row">
               <Switch>
                  <Route exact path="/">
                     <Menu />
                  </Route>
                  <Route path="/">
                     <Orders />
                  </Route>
               </Switch>
            </div>
            <ToastContainer />
         </div>
      </Router>
   );
}

export default App;
