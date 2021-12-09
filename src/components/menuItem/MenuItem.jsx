import React from "react";

const MenuItem = (props) => {
   const { onDeleteMenu, setCurrentId, item } = props;
   return (
      <div className="card  mt-2 ">
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
                  {item.promotion ? (
                     <span className="badge rounded-pill bg-warning">
                        Promotion
                     </span>
                  ) : (
                     ""
                  )}
                  <span className="badge rounded-pill  mx-2 bg-info">
                     {item.section}
                  </span>
                  <span className="badge rounded-pill  mx-2 bg-light">
                     {item.show ? "Visible" : "Hidden"}
                  </span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default MenuItem;
