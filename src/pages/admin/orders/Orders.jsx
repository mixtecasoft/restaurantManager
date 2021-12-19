import React, { useState, useEffect } from "react";
import OrderCard from "../../../components/admin/orderCard/OrderCard";
import { Link } from "react-router-dom";

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
               <Link to="/payments">
                  <button
                     type="button"
                     className="btn btn-outline-success justify-content-end mx-4"
                  >
                     Payments
                  </button>
               </Link>
               <Link to="/neworder">
                  <button
                     type="button"
                     className="btn btn-outline-primary justify-content-end mx-1"
                  >
                     Add or Edit Order
                  </button>
               </Link>
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
