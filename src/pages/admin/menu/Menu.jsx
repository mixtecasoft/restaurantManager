import React from "react";
import MenuForm from "../../../components/admin/menuForm/MenuForm";
import MenuItem from "../../../components/admin/menuItem/MenuItem";

const Menu = (props) => {
   const { menus, onDeleteMenu, setCurrentId, addOrEditMenu, currentId } =
      props;
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
