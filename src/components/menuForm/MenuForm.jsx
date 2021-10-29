import React, { useState, useEffect } from "react";
import { db } from "../../firebase";
import { toast } from "react-toastify";

const MenuForm = (props) => {
   const { addOrEditMenu, currentId } = props;

   const initialStateValues = {
      name: "",
      url: "",
      price: "",
      description: "",
      show: false,
      promotion: false,
      section: "",
   };

   const [values, setValues] = useState(initialStateValues);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
      console.log(value);
   };

   const handleCheckboxChange = (e) => {
      const { name } = e.target;
      setValues({ ...values, [name]: !values[name] });
   };

   const validURL = (str) => {
      var pattern = new RegExp(
         "^(https?:\\/\\/)?" + // protocol
            "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
            "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
            "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
            "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
            "(\\#[-a-z\\d_]*)?$",
         "i"
      ); // fragment locator
      return !!pattern.test(str);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (!validURL(values.url)) {
         return toast("invalid url", { type: "warning", autoClose: 1000 });
      }

      addOrEditMenu(values);
      setValues({ ...initialStateValues });
   };

   const getMenuById = async (id) => {
      const doc = await db.collection("menus").doc(id).get();
      setValues({ ...doc.data() });
   };

   useEffect(() => {
      if (currentId === "") {
         setValues({ ...initialStateValues });
      } else {
         getMenuById(currentId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [currentId]);

   return (
      <form onSubmit={handleSubmit}>
         <div className="card   mb-3" tyle={{ "max-width": "20rem" }}>
            <div className="card-header">Menu Editor</div>
            <div className="card-body">
               <div className="form-group">
                  <div className="input-group mb-3">
                     <div className="input-group-text bg-light">
                        <i className="material-icons">create</i>
                     </div>
                     <input
                        type="text"
                        value={values.name}
                        name="name"
                        placeholder="Name"
                        className="form-control"
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-group mb-3">
                     <div className="input-group-text bg-light">
                        <i className="material-icons">attach_money</i>
                     </div>
                     <input
                        type="number"
                        value={values.price}
                        name="price"
                        placeholder="Price"
                        className="form-control"
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-group mb-3">
                     <div className="input-group-text bg-light">
                        <i className="material-icons">insert_link</i>
                     </div>
                     <input
                        type="text"
                        className="form-control"
                        placeholder="https://image.url"
                        value={values.url}
                        name="url"
                        onChange={handleInputChange}
                     />
                  </div>
                  <div className="input-group mb-3">
                     <textarea
                        rows="3"
                        className="form-control"
                        placeholder="Write a Description"
                        name="description"
                        value={values.description}
                        onChange={handleInputChange}
                     ></textarea>
                  </div>
                  <div className="form-group mb-3">
                     <label className="form-label mt-4">Section</label>
                     <select
                        className="form-select"
                        name="section"
                        value={values.section}
                        onChange={handleInputChange}
                     >
                        <option value="">-- Please choose an option --</option>
                        <option value="camarones">Camarones</option>
                        <option value="pescados">Pescados</option>
                        <option value="cocteleria">Coctelería</option>
                        <option value="bebidas">Bebidas</option>
                     </select>
                  </div>
                  <div className="form-check form-switch mb-3">
                     <input type="hidden" name="show" value="off" />
                     <input
                        className="form-check-input"
                        type="checkbox"
                        name="show"
                        checked={values.show}
                        onChange={handleCheckboxChange}
                     />
                     <label className="form-check-label">Show in menu</label>
                  </div>
                  <div className="form-check form-switch mb-3">
                     <input
                        className="form-check-input"
                        type="checkbox"
                        name="promotion"
                        checked={values.promotion}
                        onChange={handleCheckboxChange}
                     />
                     <label className="form-check-label">Promotion</label>
                  </div>
               </div>
               <button
                  type="submit"
                  className="btn btn-outline-primary justify-content-end"
               >
                  {currentId === "" ? "Save" : "Update"}
               </button>
            </div>
         </div>
      </form>
   );
};

export default MenuForm;
