import React, { useState, useEffect } from "react";
import KitchenCard from "../../../components/admin/kitchenCard/KitchenCard";

import { db } from "../../../firebase";

import "./Kitchen.css";

const Kitchen = (props) => {
   const { orders, onDeleteOrder, setOrderId, changeStatus } = props;

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

   const updateOrderById = async (card) => {
      const doc = await db.collection("orders").doc(card.orderId).get();
      const orderFood = doc.data().food;
      switch (card.status) {
         case "committed":
            orderFood.forEach((item) => {
               if (item.id === card.id) {
                  item.status = "progress";
               }
            });
            break;
         case "progress":
            orderFood.forEach((item) => {
               if (item.id === card.id) {
                  item.status = "served";
               }
            });
            break;
         default:
            console.log("No status found");
            break;
      }

      await db.collection("orders").doc(card.orderId).update({
         food: orderFood,
      });
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
            <div className="data--container">
               <div className="row">
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-primary mb-4">Food Committed</h4>
                     {cards.map((item) =>
                        item.status === "committed" ? (
                           <KitchenCard
                              updateOrderById={updateOrderById}
                              deleteFoodCard={deleteFoodCard}
                              onDeleteOrder={onDeleteOrder}
                              setOrderId={setOrderId}
                              item={item}
                              changeStatus={changeStatus}
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
                           <KitchenCard
                              updateOrderById={updateOrderById}
                              deleteFoodCard={deleteFoodCard}
                              onDeleteOrder={onDeleteOrder}
                              setOrderId={setOrderId}
                              item={item}
                              changeStatus={changeStatus}
                              key={item.id}
                           />
                        ) : (
                           ""
                        )
                     )}
                  </div>
                  <div className="col-md-4 mt-3 p-4 ">
                     <h4 className="text-success mb-4">Food Served</h4>
                     {cards.map((item) =>
                        item.status === "served" ? (
                           <KitchenCard
                              updateOrderById={updateOrderById}
                              deleteFoodCard={deleteFoodCard}
                              onDeleteOrder={onDeleteOrder}
                              setOrderId={setOrderId}
                              item={item}
                              changeStatus={changeStatus}
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

export default Kitchen;
