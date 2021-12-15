import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/admin/navbar/Navbar";
import Client from "./pages/client/Client";
import Menu from "./pages/admin/menu/Menu";
import Orders from "./pages/admin/orders/Orders";
import Recipes from "./pages/admin/recipes/Recipes";
import firebase from "firebase";

import "./App.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
   const [user, setUser] = useState(null);

   useEffect(() => {
      firebase.auth().onAuthStateChanged((user) => {
         setUser(user);
      });
   }, []);

   console.log(user);

   return (
      <Router>
         {/* <Navbar /> */}

         <div className=".container-fluid ">
            <div className="row">
               <Switch>
                  <Route path="/" exact>
                     <Client />
                  </Route>
                  <Route exact path="/admin">
                     <Orders />
                  </Route>
                  <Route path="/dsdklsfhrhwekl">
                     <Menu />
                  </Route>
                  <Route path="/recipes">
                     <Recipes />
                  </Route>
               </Switch>
            </div>
            <ToastContainer />
         </div>
      </Router>
   );
}

export default App;
