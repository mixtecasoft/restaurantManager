import React, { useState, useEffect } from "react";
import HeroSection from "../../components/HeroSection";
import InfoSection from "../../components/InfoSection";
import { homeObjTwo } from "../../components/InfoSection/Data";
import Navbar from "../../components/Navbar";
import Menu from "../../components/Menu";
import { dark, light } from "../../components/Menu/data";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";

import { db } from "../../firebase";

const Home = () => {
   const [isOpen, setIsOpen] = useState(false);
   const [promotions, setPromotions] = useState([]);
   const [camarones, setCamarones] = useState([]);
   const [pescados, setPescados] = useState([]);
   const [cocteleria, setCocteleria] = useState([]);
   const [bebidas, setBebidas] = useState([]);

   const getMenus = async () => {
      db.collection("menus").onSnapshot((querySnapshot) => {
         const docs = [];
         const camarones = [];
         const pescados = [];
         const cocteleria = [];
         const bebidas = [];
         querySnapshot.forEach((doc) => {
            docs.push({ ...doc.data(), id: doc.id });
            switch (doc.data().section) {
               case "Camarones":
                  camarones.push({ ...doc.data(), id: doc.id });
                  break;
               case "Pescados":
                  pescados.push({ ...doc.data(), id: doc.id });
                  break;
               case "Cocteleria":
                  cocteleria.push({ ...doc.data(), id: doc.id });
                  break;
               case "Bebidas":
                  bebidas.push({ ...doc.data(), id: doc.id });
                  break;
               default:
                  console.log("No section found");
            }
         });
         setPromotions(docs);
         setCamarones(camarones);
         setPescados(pescados);
         setCocteleria(cocteleria);
         setBebidas(bebidas);
      });
   };

   const toggle = () => {
      setIsOpen(!isOpen);
   };

   useEffect(() => {
      getMenus();
   }, []);

   return (
      <>
         <Sidebar isOpen={isOpen} toggle={toggle} />
         <Navbar toggle={toggle} />
         <HeroSection />
         <Menu
            heading="Camarónes"
            data={camarones}
            props={dark}
            id={"camarones"}
         />
         <Menu
            heading="Pescados"
            data={pescados}
            props={light}
            id={"pescados"}
         />
         <Menu
            heading="Coctelería"
            data={cocteleria}
            props={dark}
            id={"cocteleria"}
         />
         <Menu heading="Bebidas" data={bebidas} props={light} id={"bebidas"} />
         <InfoSection {...homeObjTwo} />
         <Footer />
      </>
   );
};

export default Home;
