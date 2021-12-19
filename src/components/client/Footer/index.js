import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";
import {
   FooterContainer,
   FooterWrap,
   SocialMedia,
   SocialMediaWrap,
   SocialIcons,
   SocialLogo,
   SocialIconLink,
} from "./FooterElements";

const Footer = () => {
   return (
      <FooterContainer>
         <FooterWrap>
            <SocialMedia>
               <SocialMediaWrap>
                  {/* <SocialLogo>Contacto </SocialLogo> */}
                  <SocialIcons>
                     <SocialLogo to="/food"> Food</SocialLogo>

                     <SocialLogo to="/recipes"> Recipes</SocialLogo>

                     <SocialLogo to="/neworder"> New Order</SocialLogo>

                     <SocialLogo to="/status"> Status</SocialLogo>

                     <SocialLogo to="/kitchen"> Kitchen</SocialLogo>

                     <SocialLogo to="/payments"> Payments</SocialLogo>

                     <SocialIconLink
                        href="https://www.facebook.com/Rincón-ecológico-Los-cachimbos-100810408515490/"
                        target="_blank"
                        aria-label="Facebook"
                     >
                        <FaFacebook />
                     </SocialIconLink>
                     <SocialIconLink
                        href="https://www.instagram.com/loscachimbos/"
                        target="_blank"
                        aria-label="Instagram"
                     >
                        <FaInstagram />
                     </SocialIconLink>
                  </SocialIcons>
               </SocialMediaWrap>
            </SocialMedia>
         </FooterWrap>
      </FooterContainer>
   );
};

export default Footer;
