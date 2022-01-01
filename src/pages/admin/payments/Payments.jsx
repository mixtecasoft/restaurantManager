import React, { useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import PayItem from "../../../components/admin/payItem/PayItem";
import Reports from "../../../components/admin/reports/Reports";

import { Link } from "react-router-dom";

const Payments = (props) => {
   const {
      orders,
      onDeleteOrder,
      addOrEditOrder,
      orderId,
      setOrderId,
      deleteCymbals,
   } = props;

   const [data, setData] = useState([]);

   const updateStatus = () => {
      const allOrders = orders;
      allOrders.forEach((item) => {
         const food = item.food;
         const filtered = food.filter((card) => {
            return card.status !== "served";
         });
         if (filtered.length === 0) {
            item.status = "complete";
         }
      });
      setData(allOrders);
   };

   const updateOrder = async () => {
      if (orderId !== "") {
         const filtered = data.filter((card) => {
            return card.id === orderId;
         });
         const order = filtered[0];
         if (order.status !== "complete") {
            if (
               window.confirm(
                  "The order has not been completed. Do you want to delete the pending cymbals?"
               )
            ) {
               var total = 0;
               const food = order.food.filter((cymbal) => {
                  return cymbal.status === "served";
               });
               food.forEach((cymbal) => {
                  total = total + cymbal.total;
               });
               order.total = total;
               order.food = food;
               order.status = "complete";
               deleteCymbals(order);
            }
         }
      }
   };

   useEffect(() => {
      updateStatus();
   }, [orders]);

   useEffect(() => {
      updateOrder();
   }, [orderId]);

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mx-1">
               <Link to="/">
                  <i className="material-icons text-danger px-2">arrow_back</i>
               </Link>
            </div>

            <div className="data--container mx-5">
               <div className="row">
                  <div
                     className="col-md-6 mt-4"
                     style={{
                        height: "400px",
                        overflowY: "scroll", //check overflow
                     }}
                  >
                     <Table striped hover>
                        <thead>
                           <tr>
                              <th>Client</th>
                              <th>Total</th>
                              <th>Status</th>
                              <th className="d-flex justify-content-end">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {data.map((item) => (
                              <tr key={item.id}>
                                 <td>{item.client}</td>
                                 <td>${item.total}</td>
                                 <td>{item.status}</td>
                                 <td className="d-flex justify-content-end">
                                    <button
                                       type="button"
                                       className="btn btn-outline-danger justify-content-end mx-2"
                                       onClick={() => onDeleteOrder(item.id)}
                                    >
                                       Delete
                                    </button>
                                    <button
                                       type="button"
                                       className="btn btn-outline-success justify-content-end mx-2"
                                       onClick={() => setOrderId(item.id)}
                                    >
                                       Pay
                                    </button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
                  <div className="col-md-6">
                     {orderId !== "" ? (
                        <PayItem orderId={orderId} setOrderId={setOrderId} />
                     ) : (
                        ""
                     )}
                  </div>
               </div>
               <Reports orders={orders} />
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default Payments;
