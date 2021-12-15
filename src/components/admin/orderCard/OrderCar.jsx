import React from "react";

const OrderCar = () => {
   return (
      <div className="card  mt-2 ">
         <div className="d-flex justify-content-between card-header">
            <h4 className="text-primary ">Nombre</h4>
            <div>
               <i className="material-icons text-danger px-2">delete</i>
            </div>
         </div>

         <div className="card-footer text-muted">
            <div className="d-flex justify-content-between">
               <span>$ </span>
               <div>
                  <i className="material-icons text-danger px-0">remove</i>
                  <span className="p-4">1 </span>

                  <i className="material-icons text-danger px-2">add</i>
               </div>
            </div>
         </div>
      </div>
   );
};

export default OrderCar;
