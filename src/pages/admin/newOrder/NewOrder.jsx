import React, { useState, useEffect } from "react";
import { Table } from "react-bootstrap";
import OrderItem from "../../../components/admin/orderItem/OrderItem";
import { Link } from "react-router-dom";

import { db } from "../../../firebase";
import { toast } from "react-toastify";

const NewOrder = (props) => {
   const { menus, addOrEditOrder, orderId, orders, setOrderId } = props;

   const initialStateValues = {
      client: "",
      payMethod: "cash",
      total: 0,
      address: "Cachimbos",
      phone: "",
      food: [],
      date: "",
      time: "",
      status: "",
   };

   const [values, setValues] = useState(initialStateValues);
   const [food, setFood] = useState([]);
   const [orderTotal, setOrderTotal] = useState(0);

   const getDate = () => {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();

      const hours = today.getHours();
      const minutes = today.getMinutes();
      const seconds = today.getSeconds();

      const date = mm + "/" + dd + "/" + yyyy;
      const time = hours + ":" + minutes + ":" + seconds;
      return { date, time };
   };

   const verifyExist = (existItem) => {
      var i = 0;
      var existUncommited = false;
      var position = 0;
      if (existItem.length !== 0) {
         existItem.forEach((item) => {
            if (item.status === "") {
               existUncommited = true;
               position = i;
            }
            i = i + 1;
         });
      }

      return { existUncommited, position };
   };

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

   const handleClientChange = (e) => {
      const { value } = e.target;
      setOrderId(value);
   };

   const addFood = (id) => {
      const selected = menus.filter((menu) => {
         return menu.id === id;
      });
      const existItem = food.filter((item) => {
         return item.name === selected[0].name;
      });

      const { date, time } = getDate();

      const { existUncommited, position } = verifyExist(existItem);

      if (existItem.length === 0 || existUncommited === false) {
         const data = {};
         const total = parseInt(selected[0].price);
         data.id = selected[0].name + "-" + date + "-" + time;
         data.name = selected[0].name;
         data.price = selected[0].price;
         data.quantity = 1;
         data.total = total;
         data.status = "";
         data.time = "";
         data.date = "";
         setFood([...food, data]);
         setOrderTotal(orderTotal + total);
      } else {
         const quantity = parseInt(existItem[position].quantity) + 1;
         const total = quantity * parseInt(existItem[position].price);
         food.forEach((item) => {
            if (item.name === existItem[position].name) {
               item.quantity = quantity;
               item.total = total;
            }
         });
         setOrderTotal(orderTotal + parseInt(existItem[position].price));
      }
   };

   const removeFood = (id) => {
      var total = 0;
      const filtered = food.filter((item) => {
         return item.id !== id;
      });
      filtered.forEach((item) => {
         total = total + item.total;
      });
      setFood(filtered);
      setOrderTotal(total);
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (values.client === "") {
         return toast("Invalid client name", {
            type: "warning",
            autoClose: 2000,
         });
      }

      const { date, time } = getDate();
      var orderStatus = values.status;

      food.forEach((item) => {
         if (item.date === "" && item.time === "" && item.status === "") {
            item.status = "committed";
            item.date = date;
            item.time = time;
            orderStatus = "active";
         }
      });

      addOrEditOrder({
         ...values,
         total: orderTotal,
         food: food,
         date: date,
         time: time,
         status: orderStatus,
      });
      setValues({ ...initialStateValues });
      setFood([]);
      setOrderTotal(0);
   };

   const getOrderById = async (id) => {
      const doc = await db.collection("orders").doc(id).get();
      const data = doc.data();
      setValues(data);
      setFood(data.food);
      setOrderTotal(data.total);
   };

   useEffect(() => {
      if (orderId === "") {
         const { date, time } = getDate();
         setValues({ ...initialStateValues, date: date, time: time });
         setFood([]);
         setOrderTotal(0);
      } else {
         getOrderById(orderId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
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
                  <div className="col-md-6">
                     <form onSubmit={handleSubmit}>
                        <div className="form-group  mt-4">
                           <div className="input-group mb-4">
                              <div className="input-group-text bg-light">
                                 <i className="material-icons">person</i>
                              </div>
                              <select
                                 value={orderId}
                                 className="form-select"
                                 name="client"
                                 onChange={handleClientChange}
                              >
                                 <option value="">New Client</option>
                                 {orders.map((item) => (
                                    <option value={item.id} key={item.id}>
                                       {item.client}
                                    </option>
                                 ))}
                              </select>
                           </div>
                           <div className="input-group mb-4">
                              <div className="input-group-text bg-light">
                                 <i className="material-icons">
                                    account_balance_wallet
                                 </i>
                              </div>
                              <select
                                 value={values.payMethod}
                                 className="form-select"
                                 name="payMethod"
                                 onChange={handleInputChange}
                              >
                                 <option value="cash">Cash</option>
                                 <option value="card">Card</option>
                              </select>
                           </div>

                           {orderId === "" ? (
                              <div className="input-group mb-4">
                                 <div className="input-group-text bg-light">
                                    <i className="material-icons">add</i>
                                 </div>
                                 <input
                                    type="text"
                                    value={values.client}
                                    name="client"
                                    placeholder="Client Name"
                                    className="form-control"
                                    onChange={handleInputChange}
                                 />
                              </div>
                           ) : (
                              ""
                           )}

                           <div className="input-group mb-4">
                              <div className="input-group-text bg-light">
                                 <i className="material-icons">phone</i>
                              </div>
                              <input
                                 type="text"
                                 value={values.phone}
                                 name="phone"
                                 placeholder="Phone"
                                 className="form-control"
                                 onChange={handleInputChange}
                              />
                           </div>
                           <div className="input-group mb-4">
                              <div className="input-group-text bg-light">
                                 <i className="material-icons">
                                    monetization_on
                                 </i>
                              </div>
                              <input
                                 disabled
                                 type="number"
                                 name="total"
                                 className="form-control"
                                 value={orderTotal}
                              />
                           </div>
                        </div>

                        <button
                           type="submit"
                           className="btn btn-outline-primary justify-content-end"
                        >
                           {orderId === "" ? "Save" : "Update"}
                        </button>
                     </form>
                  </div>
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
                              <th>Menu</th>
                              <th>Price</th>
                              <th className="d-flex justify-content-end">
                                 Action
                              </th>
                           </tr>
                        </thead>
                        <tbody>
                           {menus.map((item) => {
                              if (item.show === true) {
                                 return (
                                    <tr key={item.id}>
                                       <td>{item.name}</td>
                                       <td>${item.price}</td>
                                       <td className="d-flex justify-content-end">
                                          <button
                                             type="button"
                                             className="btn btn-outline-info justify-content-end"
                                             onClick={() => addFood(item.id)}
                                          >
                                             Add
                                          </button>
                                       </td>
                                    </tr>
                                 );
                              } else {
                                 return "";
                              }
                           })}
                        </tbody>
                     </Table>
                  </div>
               </div>
               <div className="col-sm mt-6">
                  <ul className="list-group mt-5">
                     {food.map((item) => (
                        <OrderItem
                           item={item}
                           removeFood={removeFood}
                           key={item.id}
                        />
                     ))}
                  </ul>
               </div>
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default NewOrder;
