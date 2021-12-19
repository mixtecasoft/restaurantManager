import React from "react";

const OrderItem = (props) => {
   const { item, removeFood } = props;
   return (
      <div className="card  mt-2 ">
         <div className="d-flex justify-content-between card-header">
            <h4 className="text-success ">{item.name}</h4>
            <div>
               <i
                  className="material-icons text-danger px-2 "
                  onClick={() => removeFood(item.id)}
               >
                  delete
               </i>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">
               Status: {item.status === "" ? "Unconfirmed" : item.status}
            </li>
            <li className="list-group-item">Time:{item.time}</li>
         </ul>
         <div className="card-footer text-muted">
            <div className="d-flex justify-content-between">
               <span className="rounded-pill bg-warning px-5">
                  Quantity: {item.quantity}
               </span>

               <div>
                  {/* <button
                     type="button"
                     className="btn btn-outline-success btn-sm justify-content-end"
                  >
                     <i className="material-icons text-danger px-2">remove</i>
                  </button> */}

                  <span>Subtotal: ${item.total} </span>

                  {/* 
                  <button
                     type="button"
                     className="btn btn-outline-success  btn-sm justify-content-end"
                  >
                     <i className="material-icons text-danger px-2">add</i>
                  </button> */}
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderItem;
