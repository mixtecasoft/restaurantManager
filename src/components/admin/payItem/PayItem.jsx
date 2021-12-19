import React, { useEffect, useState } from "react";

import { db } from "../../../firebase";
import { ToastContainer, toast } from "react-toastify";

const PayItem = (props) => {
   const { orderId, setOrderId } = props;

   const [data, setData] = useState({});

   const notify = () =>
      toast("Making the payment of the order", {
         type: "success",
         autoClose: 2000,
      });

   const getOrderById = async (id) => {
      const doc = await db.collection("orders").doc(id).get();
      const order = doc.data();
      setData(order);
   };

   const payDone = async () => {
      await db.collection("history").doc().set(data);
      await db.collection("orders").doc(orderId).delete();
      notify();
      setOrderId("");
   };

   useEffect(() => {
      getOrderById(orderId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [orderId]);

   return (
      <div className="card  mt-2 ">
         <div className="d-flex justify-content-between card-header">
            <h4 className="text-success ">{data.client}</h4>
            <div>
               <button
                  type="button"
                  className="btn btn-outline-danger justify-content-end mx-2"
                  onClick={() => setOrderId("")}
               >
                  Cancel
               </button>
               <button
                  type="button"
                  className="btn btn-outline-primary justify-content-end mx-2"
                  onClick={() => payDone()}
               >
                  Done
               </button>
            </div>
         </div>
         <ul className="list-group list-group-flush">
            <li className="list-group-item">Client: {data.client}</li>
            <li className="list-group-item">Phone:{data.phone}</li>
         </ul>
         <div className="card-footer text-muted">
            <div className="d-flex justify-content-between">
               <span className="rounded-pill bg-warning px-5">
                  Time: {data.time}
               </span>

               <div>
                  {/* <button
                     type="button"
                     className="btn btn-outline-success btn-sm justify-content-end"
                  >
                     <i className="material-icons text-danger px-2">remove</i>
                  </button> */}

                  <span>Total: ${data.total} </span>

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

export default PayItem;
