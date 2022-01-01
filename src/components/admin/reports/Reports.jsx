import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

import { db } from "../../../firebase";

const Reports = (props) => {
   const { orders } = props;
   const [history, setHistory] = useState([]);
   const [filteredHistory, setFilteredHistory] = useState([]);
   const [todayFilter, setTodayFilter] = useState([]);
   const [startDate, setStartDate] = useState(new Date());
   const [filterDate, setFilterDate] = useState("");
   const [dalyTotal, setDalyTotal] = useState(0);

   const getData = async () => {
      db.collection("history").onSnapshot((querySnapshot) => {
         const docs = [];
         var total = 0;
         querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
         });

         docs.sort((a, b) => {
            var orderA = a.date;
            var orderB = b.date;
            return orderA < orderB ? -1 : orderA > orderB ? 1 : 0;
         });

         const today = docs.filter(filterByToday);
         today.forEach((item) => {
            total = total + item.total;
         });

         setDalyTotal(total);
         setHistory(docs);
         setTodayFilter(today);
         setFilteredHistory(today);
      });
   };

   const getDate = () => {
      const today = new Date();
      const dd = today.getDate();
      const mm = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();

      const date = mm + "/" + dd + "/" + yyyy;
      return date;
   };

   function filterByToday(item) {
      const date = getDate();
      if (date === item.date) {
         return true;
      }
      return false;
   }

   function filterByDate(item) {
      if (filterDate === item.date) {
         return true;
      }
      return false;
   }

   const calendarDate = () => {
      const today = new Date(startDate);
      const dd = today.getDate();
      const mm = today.getMonth() + 1; //January is 0!
      const yyyy = today.getFullYear();

      const date = mm + "/" + dd + "/" + yyyy;
      setFilterDate(date);
   };

   useEffect(() => {
      getData();
   }, []);

   useEffect(() => {
      calendarDate();
   }, [startDate]);

   useEffect(() => {
      setFilteredHistory(history.filter(filterByDate));
   }, [filterDate]);

   return (
      <>
         <div className="alert alert-dismissible alert-primary">
            <ul>
               <li className=" d-flex justify-content-between align-items-center">
                  Date:
                  <span className="badge bg-primary rounded-pill">
                     {getDate()}
                  </span>
               </li>
               <li className=" d-flex justify-content-between align-items-center">
                  Active orders:
                  <span className="badge bg-primary rounded-pill">
                     {orders.length}
                  </span>
               </li>
               <li className=" d-flex justify-content-between align-items-center">
                  Paid orders:
                  <span className="badge bg-primary rounded-pill">
                     {todayFilter.length}
                  </span>
               </li>
            </ul>
            <strong>Total sales:</strong> $ {dalyTotal} MXN
         </div>
         <h3 className="my-4">
            List of paid orders from:
            <small className="text-muted">{filterDate}</small>
         </h3>

         <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
         />

         {filteredHistory.map((item) => {
            return (
               <div
                  className="alert alert-dismissible alert-warning my-2"
                  key={item.id}
               >
                  {/* <button
                     type="button"
                     className="btn-close"
                     data-bs-dismiss="alert"
                  ></button> */}
                  <h4 className="alert-heading">{item.client}</h4>
                  <div className="d-flex justify-content-between align-items-center mb-0">
                     Total: ${item.total}
                     <p className="alert-link">
                        Show details
                        <i className="material-icons text-danger px-2 ">
                           arrow_forward
                        </i>
                     </p>
                  </div>
               </div>
            );
         })}
      </>
   );
};

export default Reports;
