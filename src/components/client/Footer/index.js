import React from "react";
import { FaFacebook, FaInstagram } from "react-icons/fa";
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
                  <SocialLogo>Contacto </SocialLogo>
                  <SocialIcons>
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
