import React from "react";
import { Button } from "react-bootstrap";

import "./Orders.css";

const Orders = (props) => {
   const { orders, onDeleteOrder, setOrderId, addOrEditOrder } = props;

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mb-2 p-2">
               <Button variant="primary" href="/neworder">
                  New Order
               </Button>
            </div>

            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default Orders;
