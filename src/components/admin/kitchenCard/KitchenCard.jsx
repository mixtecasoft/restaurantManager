import React from "react";

const OrderCard = (props) => {
   const { updateOrderById, deleteFoodCard, item } = props;
   return (
      <div className="card  mt-2 ">
         <div className="d-flex justify-content-between card-header">
            <i
               className="material-icons text-danger px-2"
               onClick={() => deleteFoodCard(item)}
            >
               close
            </i>
            <h4 className="text-primary ">
               {item.name} ({item.quantity})
            </h4>

            {item.status === "served" ? (
               ""
            ) : (
               <i
                  className="material-icons text-danger px-2"
                  onClick={() => updateOrderById(item)}
               >
                  east
               </i>
            )}
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">Client: {item.client}</li>
            <li className="list-group-item">Subtotal: {item.total}</li>
         </ul>
         <div className="card-footer text-muted">
            <div className="d-flex justify-content-end">
               <span className="rounded-pill bg-warning px-5">
                  Time: {item.time}
               </span>
            </div>
         </div>
      </div>
   );
};

export default OrderCard;
