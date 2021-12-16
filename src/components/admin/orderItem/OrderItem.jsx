import React from "react";

const OrderItem = (props) => {
   const { onDeleteOrder, setOrderId, item } = props;
   return (
      <div className="card  mt-2 ">
         <div className="d-flex justify-content-between card-header">
            <div>
               <i
                  className="material-icons text-danger px-2"
                  onClick={() => onDeleteOrder(item.id)}
               >
                  close
               </i>
               <i
                  className="material-icons"
                  onClick={() => setOrderId(item.id)}
               >
                  create
               </i>
            </div>
            <h6 className="text-primary ">{item.clientName}</h6>
         </div>
         <div className="card-body ">
            <div className="d-flex justify-content-between">
               <span className="badge rounded-pill  m-2 bg-info">
                  Total: $ {item.total}
               </span>
               <div>
                  <i
                     className="material-icons text-danger px-2"
                     onClick={() => onDeleteOrder(item.id)}
                  >
                     east
                  </i>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderItem;
