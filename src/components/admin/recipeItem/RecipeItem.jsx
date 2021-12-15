import React from "react";
import { Accordion } from "react-bootstrap";

const RecipeItem = (props) => {
   const { setCurrentId, item } = props;
   return (
      <>
         <Accordion.Item eventKey={item.id}>
            <Accordion.Header>{item.name}</Accordion.Header>

            <Accordion.Body>
               <div className="card">
                  <div className="card-body">
                     <textarea
                        rows="6"
                        className="form-control"
                        value={item.recipe}
                        readOnly="True"
                     ></textarea>
                  </div>
                  <div className="card-footer d-flex justify-content-end">
                     <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => setCurrentId(item.id)}
                     >
                        Edit Recipe
                     </button>
                  </div>
               </div>
            </Accordion.Body>
         </Accordion.Item>
      </>
   );
};

export default RecipeItem;
