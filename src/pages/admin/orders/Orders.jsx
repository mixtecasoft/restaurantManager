import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import OrderCard from "../../../components/admin/orderCard/OrderCard";

import { db } from "../../../firebase";

import "./Orders.css";

const Orders = (props) => {
   const { orders } = props;

   const [cards, setCards] = useState([]);

   const fillData = () => {
      const data = [];
      orders.forEach((item) => {
         item.food.forEach((foodElement) => {
            foodElement = {
               ...foodElement,
               orderId: item.id,
               client: item.client,
            };
            data.push(foodElement);
         });
      });
      setCards(data);
   };

   const deleteFoodCard = async (card) => {
      var total = 0;
      const doc = await db.collection("orders").doc(card.orderId).get();
      const orderFood = doc.data().food;
      const filtered = orderFood.filter((item) => {
         return item.id !== card.id;
      });
      filtered.forEach((item) => {
         total = total + parseInt(item.total);
      });

      await db.collection("orders").doc(card.orderId).update({
         food: filtered,
         total: total,
      });
   };

   useEffect(() => {
      fillData();
   }, [orders]);

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mb-2 ">
               <Button variant="success" className="mx-4" href="/payments">
                  Payments
               </Button>
               <Button variant="primary" className="mx-1" href="/neworder">
                  Add or Edit Order
               </Button>
            </div>

            <div className="data--container">
               <div className="row">
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-primary mb-4">Food Committed</h4>
                     {cards.map((item) =>
                        item.status === "committed" ? (
                           <OrderCard
                              deleteFoodCard={deleteFoodCard}
                              item={item}
                              key={item.id}
                           />
                        ) : (
                           ""
                        )
                     )}
                  </div>
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-danger mb-4">Food In Progress</h4>
                     {cards.map((item) =>
                        item.status === "progress" ? (
                           <OrderCard
                              deleteFoodCard={deleteFoodCard}
                              item={item}
                              key={item.id}
                           />
                        ) : (
                           ""
                        )
                     )}
                  </div>
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-success mb-4">Ready To Serve</h4>
                     {cards.map((item) =>
                        item.status === "served" ? (
                           <OrderCard
                              deleteFoodCard={deleteFoodCard}
                              item={item}
                              key={item.id}
                           />
                        ) : (
                           ""
                        )
                     )}
                  </div>
               </div>
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default Orders;
