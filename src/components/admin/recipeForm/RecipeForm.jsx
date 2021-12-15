import React, { useState, useEffect } from "react";
import { db } from "../../../firebase";

const RecipeForm = (props) => {
   const { editRecipe, currentId } = props;

   const initialStateValues = {
      name: "",
      url: "",
      price: "",
      description: "",
      show: false,
      promotion: false,
      section: "",
      recipe: "",
   };

   const [values, setValues] = useState(initialStateValues);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();
      editRecipe(values);
      setValues({ ...initialStateValues });
   };

   const getMenuById = async (id) => {
      const doc = await db.collection("menus").doc(id).get();
      setValues({ ...doc.data() });
   };

   useEffect(() => {
      getMenuById(currentId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentId]);

   return (
      <form onSubmit={handleSubmit}>
         <div className="card   mb-3" tyle={{ "max-width": "20rem" }}>
            <div className="card-header">Recipe Editor</div>
            <div className="card-body">
               <div className="form-group">
                  <div className="input-group mb-3">
                     <div className="input-group-text bg-light">
                        <i className="material-icons">create</i>
                     </div>
                     <input
                        className="form-control"
                        type="text"
                        value={values.name}
                        name="name"
                        readOnly="True"
                     />
                  </div>

                  <div className="input-group mb-3">
                     <textarea
                        rows="6"
                        className="form-control"
                        placeholder="Write a Description"
                        name="recipe"
                        value={values.recipe}
                        onChange={handleInputChange}
                     ></textarea>
                  </div>
               </div>
               <button type="submit" className="btn btn-info ">
                  Save
               </button>
            </div>
         </div>
      </form>
   );
};

export default RecipeForm;
