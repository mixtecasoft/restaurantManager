import React, { useState, useEffect } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { animateScroll as scroll } from "react-scroll";

import {
   Nav,
   NavbarContainer,
   MobileIcon,
   NavMenu,
   NavItem,
   NavLinks,
   NavBtn,
   NavBtnLink,
   SocialMedia,
   SocialMediaWrap,
   SocialIcons,
} from "./NavbarElements";
export const Navbar = ({ toggle }) => {
   const [scrollNav, setScrollNav] = useState(false);

   const changeNav = () => {
      if (window.scrollY >= 80) {
         setScrollNav(true);
      } else {
         setScrollNav(false);
      }
   };

   useEffect(() => {
      window.addEventListener("scroll", changeNav);
   }, []);

   const toggleHome = () => {
      scroll.scrollToTop();
   };

   return (
      <>
         <IconContext.Provider value={{ color: "#fff" }}>
            <Nav scrollNav={scrollNav}>
               <NavbarContainer>
                  <MobileIcon onClick={toggle}>
                     <FaBars />
                  </MobileIcon>
                  <SocialMedia>
                     <SocialMediaWrap>
                        <SocialIcons>
                           <FaWhatsapp onClick={toggleHome} />
                           953 593 7613
                        </SocialIcons>
                     </SocialMediaWrap>
                  </SocialMedia>
                  <NavMenu>
                     <NavItem>
                        <NavLinks
                           to="cocteleria"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           COCTELERIA
                        </NavLinks>
                        <NavLinks
                           to="camarones"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           CAMARONES
                        </NavLinks>
                        <NavLinks
                           to="pescados"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           PESCADOS
                        </NavLinks>

                        <NavLinks
                           to="bebidas"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           BEBIDAS
                        </NavLinks>
                        <NavLinks
                           to="otros"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           OTROS
                        </NavLinks>
                        <NavLinks
                           to="reserva"
                           smooth={true}
                           duration={150}
                           spy={true}
                           exact="true"
                           offset={-80}
                        >
                           RESERVA
                        </NavLinks>
                     </NavItem>

                     {/* <NavBtn>
                        <NavBtnLink to="/order">Realizar Pedido</NavBtnLink>
                     </NavBtn> */}
                  </NavMenu>
               </NavbarContainer>
            </Nav>
         </IconContext.Provider>
      </>
   );
};

export default Navbar;
