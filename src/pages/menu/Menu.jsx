import React, { useEffect, useState } from "react";
import MenuForm from "../../components/menuForm/MenuForm";
import MenuItem from "../../components/menuItem/MenuItem";

import { db } from "../../firebase";
import { toast } from "react-toastify";

const Menu = () => {
   const [menus, setMenus] = useState([]);
   const [currentId, setCurrentId] = useState("");

   const getMenus = async () => {
      db.collection("menus").onSnapshot((querySnapshot) => {
         const docs = [];
         querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
         });

         setMenus(docs);
      });
   };

   const onDeleteMenu = async (id) => {
      if (window.confirm("Are you sure you want to delete this Menu?")) {
         await db.collection("menus").doc(id).delete();
         toast("Menu Removed Successfully", {
            type: "error",
            autoClose: 1500,
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
               autoClose: 1500,
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
         <div className="col-md-4 mt-4 p-4">
            <MenuForm {...{ addOrEditMenu, currentId }} />
         </div>
         <div className="col-md-8 mt-3 p-4">
            {menus.map((item) => {
               if (item.section === "Camarones") {
                  return (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  );
               }
               return "";
            })}
            {menus.map((item) => {
               if (item.section === "Pescados") {
                  return (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  );
               }
               return "";
            })}
            {menus.map((item) => {
               if (item.section === "Cocteleria") {
                  return (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  );
               }
               return "";
            })}
            {menus.map((item) => {
               if (item.section === "Bebidas") {
                  return (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  );
               }
               return "";
            })}
            {menus.map((item) => {
               if (item.section === "Otros") {
                  return (
                     <MenuItem
                        {...{ onDeleteMenu, setCurrentId, item }}
                        key={item.id}
                     />
                  );
               }
               return "";
            })}
         </div>
      </>
   );
};

export default Menu;
