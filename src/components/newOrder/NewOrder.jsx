import React, { useState } from "react";
import { Modal, Button, Table } from "react-bootstrap";

function NewOrder(props) {
   const { menus } = props;

   const initialStateValues = {
      clientName: "",
      payMethod: "cash",
      total: 0,
      address: "Cachimbos",
      phone: 0,
      order: [],
      crated: "",
   };

   const [values, setValues] = useState(initialStateValues);

   const handleInputChange = (e) => {
      const { name, value } = e.target;
      setValues({ ...values, [name]: value });
   };

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

   return (
      <Modal
         {...props}
         size="xl"
         aria-labelledby="contained-modal-title-vcenter"
         centered
      >
         <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
               New order
            </Modal.Title>
         </Modal.Header>
         <Modal.Body>
            <form>
               <div class="container">
                  <div class="row">
                     <div class="col-md-6">
                        <div className="form-group mb-3">
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
                        <div className="input-group mb-3">
                           <div className="input-group-text bg-light">
                              <i className="material-icons">person</i>
                           </div>
                           <input
                              type="text"
                              name="clientname"
                              placeholder="Name"
                              className="form-control"
                              onChange={handleInputChange}
                           />
                        </div>
                        <div className="input-group mb-3">
                           <div className="input-group-text bg-light">
                              <i className="material-icons">phone</i>
                           </div>
                           <input
                              type="number"
                              name="phone"
                              placeholder="Phone"
                              className="form-control"
                              onChange={handleInputChange}
                           />
                        </div>
                        <div className="input-group mb-3">
                           <div className="input-group-text bg-light">
                              <i className="material-icons">monetization_on</i>
                           </div>
                           <input
                              disabled
                              type="number"
                              name="total"
                              placeholder="Total"
                              className="form-control"
                              value={values.total}
                           />
                        </div>
                     </div>
                     <div
                        class="col-md mt-4"
                        style={{ height: "250px", "overflow-y": "scroll" }}
                     >
                        <div className="card  mt-2 ">
                           <div className="d-flex justify-content-between card-header">
                              <h4 className="text-primary ">Nombre</h4>
                              <div>
                                 <i className="material-icons text-danger px-2">
                                    close
                                 </i>
                              </div>
                           </div>
                           <div className="card-body ">
                              <p>Nombre</p>
                           </div>
                           <div className="card-footer text-muted">
                              <div className="d-flex justify-content-between">
                                 <span>$ </span>
                                 <div>
                                    {true ? (
                                       <span className="badge rounded-pill bg-warning">
                                          Promotion
                                       </span>
                                    ) : (
                                       ""
                                    )}
                                    <span className="badge rounded-pill  mx-2 bg-info">
                                       info
                                    </span>
                                    <span className="badge rounded-pill  mx-2 bg-light">
                                       {true ? "Visible" : "Hidden"}
                                    </span>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </form>
            <div
               className="input-group  mt-3"
               style={{
                  height: "400px",
                  "overflow-y": "scroll",
               }}
            >
               <Table striped bordered hover>
                  <thead>
                     <tr>
                        <th>Menu</th>
                        <th>Price</th>
                        <th className="d-flex justify-content-end">Action</th>
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
         </Modal.Body>
         <Modal.Footer>
            <Button variant="primary" onClick={props.onHide}>
               Create
            </Button>
         </Modal.Footer>
      </Modal>
   );
}

export default NewOrder;
