import React, { useEffect, useState } from "react";
import MenuForm from "../../components/menuForm/MenuForm";
import MenuItem from "../../components/menuItem/MenuItem";
import NewOrder from "../../components/newOrder/NewOrder";
import { Button } from "react-bootstrap";

import "./Orders.css";

import { db } from "../../firebase";
import { toast } from "react-toastify";

const Orders = () => {
   const [menus, setMenus] = useState([]);
   const [currentId, setCurrentId] = useState("");
   const [modalShow, setModalShow] = React.useState(false);

   const getMenus = async () => {
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
   };

   const onDeleteMenu = async (id) => {
      if (window.confirm("Are you sure you want to delete this Menu?")) {
         await db.collection("menus").doc(id).delete();
         toast("Menu Removed Successfully", {
            type: "error",
            autoClose: 2000,
         });
      }
   };

   useEffect(() => {
      getMenus();
   }, []);

   const addOrEditMenu = async (linkObject) => {
      try {
         if (currentId === "") {
            await db.collection("menus").doc().set(linkObject);
            toast("New Menu Added", {
               type: "success",
            });
         } else {
            await db.collection("menus").doc(currentId).update(linkObject);
            toast("Menu Updated Successfully", {
               type: "info",
            });
            setCurrentId("");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mb-2 p-2">
               <Button variant="primary" onClick={() => setModalShow(true)}>
                  New Order
               </Button>
            </div>

            <div className="data--container">
               <NewOrder
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                  {...{ menus }}
               />
               <div className="col-md-4 p-4">
                  {menus.map((item) => (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  ))}
               </div>
               <div className="col-md-4  p-4">
                  {menus.map((item) => (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  ))}
               </div>
               <div className="col-md-4 p-4">
                  <MenuForm {...{ addOrEditMenu, currentId }} />
               </div>
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default Orders;
