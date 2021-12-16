import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/admin/navbar/Navbar";
import Client from "./pages/client/Client";
import Menu from "./pages/admin/menu/Menu";
import Orders from "./pages/admin/orders/Orders";
import NewOrder from "./pages/admin/newOrder/NewOrder";
import Recipes from "./pages/admin/recipes/Recipes";

import "./App.css";

import { db } from "./firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
   const [menus, setMenus] = useState([]);
   const [commited, setCommited] = useState([]);
   const [progress, setProgress] = useState([]);
   const [served, setServed] = useState([]);
   const [currentId, setCurrentId] = useState("");
   const [orderId, setOrderId] = useState("");

   const notifyRemoved = () =>
      toast("Removed Successfully", {
         type: "error",
         autoClose: 2000,
      });

   const notifyAdded = () =>
      toast("Added Successfully", {
         type: "success",
         autoClose: 2000,
      });

   const notifyUpdated = () =>
      toast("Updated Successfully", {
         type: "info",
         autoClose: 2000,
      });

   const getData = async () => {
      db.collection("menus").onSnapshot((querySnapshot) => {
         const docs = [];
         querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
         });

         docs.sort((a, b) => {
            var menuA = a.name.toUpperCase();
            var menuB = b.name.toUpperCase();
            return menuA < menuB ? -1 : menuA > menuB ? 1 : 0;
         });
         setMenus(docs);
      });
      db.collection("orders").onSnapshot((querySnapshot) => {
         const commited = [];
         const progress = [];
         const served = [];
         querySnapshot.forEach((doc) => {
            switch (doc.data().status) {
               case "commited":
                  commited.push({ ...doc.data(), id: doc.id });
                  break;
               case "progress":
                  progress.push({ ...doc.data(), id: doc.id });
                  break;
               case "served":
                  served.push({ ...doc.data(), id: doc.id });
                  break;
               default:
                  console.log(doc.data().status);
            }
         });

         setCommited(commited);
         setProgress(progress);
         setServed(served);
      });
   };

   const onDeleteMenu = async (id) => {
      if (window.confirm("Are you sure you want to delete this Menu?")) {
         await db.collection("menus").doc(id).delete();
         notifyRemoved();
      }
   };

   const onDeleteOrder = async (id) => {
      if (window.confirm("Are you sure you want to delete this Order?")) {
         await db.collection("orders").doc(id).delete();
         notifyRemoved();
      }
   };

   const addOrEditMenu = async (linkObject) => {
      try {
         if (currentId === "") {
            await db.collection("menus").doc().set(linkObject);
            notifyAdded();
         } else {
            await db.collection("menus").doc(currentId).update(linkObject);
            setCurrentId("");
            notifyUpdated();
         }
      } catch (error) {
         console.error(error);
      }
   };

   useEffect(() => {
      getData();
   }, []);

   const addOrEditOrder = async (linkObject) => {
      try {
         if (orderId === "") {
            await db.collection("orders").doc().set(linkObject);
            notifyAdded();
         } else {
            await db.collection("orders").doc(orderId).update(linkObject);
            setOrderId("");
            notifyUpdated();
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <Router>
         {/* <Navbar /> */}

         <div className=".container-fluid ">
            <div className="row">
               <Switch>
                  <Route path="/" exact>
                     <Client />
                  </Route>
                  <Route exact path="/orders">
                     <Orders
                        commited={commited}
                        progress={progress}
                        served={served}
                        onDeleteOrder={onDeleteOrder}
                        setOrderId={setOrderId}
                     />
                  </Route>
                  <Route exact path="/neworder">
                     <NewOrder
                        menus={menus}
                        addOrEditOrder={addOrEditOrder}
                        orderId={orderId}
                     />
                  </Route>
                  <Route path="/food">
                     <Menu
                        menus={menus}
                        onDeleteMenu={onDeleteMenu}
                        setCurrentId={setCurrentId}
                        addOrEditMenu={addOrEditMenu}
                        currentId={currentId}
                     />
                  </Route>
                  <Route path="/recipes">
                     <Recipes menus={menus} />
                  </Route>
               </Switch>
            </div>
            <ToastContainer />
         </div>
      </Router>
   );
};

export default App;
