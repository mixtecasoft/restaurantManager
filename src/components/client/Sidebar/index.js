import React from "react";
import {
   SidebarContainer,
   Icon,
   CloseIcon,
   SidebarWrapper,
   SidebarMenu,
   SidebarLink,
   SideBtnWrap,
   SidebarRoute,
} from "./SidebarElements";

export const Sidebar = ({ isOpen, toggle }) => {
   return (
      <SidebarContainer isOpen={isOpen} onClick={toggle}>
         <Icon onClick={toggle}>
            <CloseIcon />
         </Icon>
         <SidebarWrapper>
            <SidebarMenu>
               <SidebarLink to="cocteleria" onClick={toggle}>
                  Coctelería
               </SidebarLink>
               <SidebarLink to="camarones" onClick={toggle}>
                  Camarónes
               </SidebarLink>
               <SidebarLink to="pescados" onClick={toggle}>
                  Pescados
               </SidebarLink>

               <SidebarLink to="bebidas" onClick={toggle}>
                  Bebidas
               </SidebarLink>
               <SidebarLink to="otros" onClick={toggle}>
                  Otros
               </SidebarLink>
               <SidebarLink to="reserva" onClick={toggle}>
                  Reserva
               </SidebarLink>
            </SidebarMenu>
            {/* <SideBtnWrap>
               <SidebarRoute to="/order">Realizar Pedido</SidebarRoute>
            </SideBtnWrap> */}
         </SidebarWrapper>
      </SidebarContainer>
   );
};

export default Sidebar;
