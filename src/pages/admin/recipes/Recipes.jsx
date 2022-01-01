import React, { useState } from "react";
import RecipeForm from "../../../components/admin/recipeForm/RecipeForm";
import RecipeItem from "../../../components/admin/recipeItem/RecipeItem";
import { Accordion } from "react-bootstrap";

import { db } from "../../../firebase";
import { toast } from "react-toastify";

const Recipes = (props) => {
   const { menus } = props;

   const [currentId, setCurrentId] = useState("");

   const editRecipe = async (linkObject) => {
      try {
         await db.collection("menus").doc(currentId).update(linkObject);
         toast("Recipe Updated Successfully", {
            type: "info",
         });
         setCurrentId("");
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <>
         <Accordion className="col-md-8  mt-4  p-4">
            {menus.map((item) => (
               <RecipeItem {...{ setCurrentId, item }} key={item.id} />
            ))}
         </Accordion>

         <div className="col-md-4 mt-3 p-4">
            {currentId ? <RecipeForm {...{ editRecipe, currentId }} /> : ""}
         </div>
      </>
   );
};

export default Recipes;
