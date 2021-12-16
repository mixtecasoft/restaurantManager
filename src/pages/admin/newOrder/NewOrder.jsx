import React, { useState, useEffect } from "react";
import { Button, Table } from "react-bootstrap";
import OrderCar from "../../../components/admin/orderCard/OrderCar";

import { db } from "../../../firebase";
import { toast } from "react-toastify";

const NewOrder = (props) => {
   const { menus, addOrEditOrder, orderId } = props;

   const initialStateValues = {
      clientName: "",
      payMethod: "cash",
      total: 0,
      address: "Cachimbos",
      phone: "",
      order: [],
      date: "",
      time: "",
      status: "commited",
   };

   const [values, setValues] = useState(initialStateValues);

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

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

   const handleSubmit = (e) => {
      e.preventDefault();

      if (values.clientName === "") {
         return toast("Invalid client name", {
            type: "warning",
            autoClose: 2000,
         });
      }

      addOrEditOrder(values);
      setValues({ ...initialStateValues });
   };

   const getOrderById = async (id) => {
      const doc = await db.collection("orders").doc(id).get();
      setValues({ ...doc.data() });
   };

   useEffect(() => {
      if (orderId === "") {
         setValues({ ...initialStateValues });
         const { date, time } = getDate();
         setValues({ ...values, date: date, time: time });
      } else {
         getOrderById(orderId);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, [orderId]);

   return (
      <>
         <div className="data responsive-top-margin animateFadeIn animateSlideUp is-animate">
            <div className="mb-2 p-2">
               <Button variant="primary" href="/orders">
                  Back
               </Button>
            </div>

            <div className="data--container">
               <div className="row">
                  <div className="col-md-6">
                     <form onSubmit={handleSubmit}>
                        <div className="form-group">
                           <div className="form-group mb-4">
                              <label className="form-label ">Pay Method</label>
                              <select
                                 className="form-select"
                                 name="paymethod"
                                 onChange={handleInputChange}
                              >
                                 <option value="cash">Cash</option>
                                 <option value="card">Card</option>
                              </select>
                           </div>
                           <div className="input-group mb-4">
                              <div className="input-group-text bg-light">
                                 <i className="material-icons">person</i>
                              </div>
                              <input
                                 type="text"
                                 value={values.clientName}
                                 name="clientName"
                                 placeholder="Name"
                                 className="form-control"
                                 onChange={handleInputChange}
                              />
                           </div>
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
                                 value={values.total}
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
                     className="col-md-6  mt-4"
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
                           {menus.map((item) => (
                              <tr key={item.id}>
                                 <td>{item.name}</td>
                                 <td>${item.price}</td>
                                 <td className="d-flex justify-content-end">
                                    <Button
                                       variant="info"
                                       onClick={props.onHide}
                                       size="sm"
                                    >
                                       Add
                                    </Button>
                                 </td>
                              </tr>
                           ))}
                        </tbody>
                     </Table>
                  </div>
               </div>
               <div className="col-md mt-6">
                  <OrderCar />
               </div>
            </div>
            <div className="data--graph  startAnimationPosition animateGraph"></div>
         </div>
      </>
   );
};

export default NewOrder;
