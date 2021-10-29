import React from "react";

const MenuItem = (props) => {
   const { onDeleteMenu, setCurrentId, item } = props;
   return (
      <div className="card mt-4  ">
         <div className="d-flex justify-content-between card-header">
            <h4 className="text-primary ">{item.name}</h4>
            <div>
               <i
                  className="material-icons text-danger px-2"
                  onClick={() => onDeleteMenu(item.id)}
               >
                  close
               </i>
               <i
                  className="material-icons"
                  onClick={() => setCurrentId(item.id)}
               >
                  create
               </i>
            </div>
         </div>
         <div className="card-body ">
            <p>{item.description}</p>
         </div>

         <div className="card-footer text-muted">
            <div className="d-flex justify-content-between">
               <span>$ {item.price}</span>
               <div>
                  <span className="badge rounded-pill bg-success mx-2">
                     {item.show ? "Visible" : "Hidden"}
                  </span>
                  {item.promotion ? (
                     <span className="badge rounded-pill bg-primary">
                        Promotion
                     </span>
                  ) : (
                     ""
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default MenuItem;
