import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import OrderItem from "../../../components/admin/orderItem/OrderItem";

import "./Orders.css";

const Orders = (props) => {
   const { commited, progress, served, onDeleteOrder, setOrderId } = props;

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mb-2 p-2">
               <Button variant="primary" href="/neworder">
                  New Order
               </Button>
            </div>

            <div className="data--container">
               <div className="row">
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-primary mb-4">Commited</h4>
                     {commited.map((item) => (
                        <OrderItem
                           onDeleteOrder={onDeleteOrder}
                           setOrderId={setOrderId}
                           item={item}
                           key={item.id}
                        />
                     ))}
                  </div>
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-danger mb-4">In Progress</h4>
                     {progress.map((item) => (
                        <OrderItem
                           onDeleteOrder={onDeleteOrder}
                           setOrderId={setOrderId}
                           item={item}
                           key={item.id}
                        />
                     ))}
                  </div>
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-success mb-4">Order Served</h4>
                     {served.map((item) => (
                        <OrderItem
                           onDeleteOrder={onDeleteOrder}
                           setOrderId={setOrderId}
                           item={item}
                           key={item.id}
                        />
                     ))}
                  </div>
               </div>
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default Orders;
