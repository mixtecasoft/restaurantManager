import styled from "styled-components";
import { MdKeyboardArrowRight, MdArrowForward } from "react-icons/md";
import ImgBg from "../../../images/palapa.jpg";

export const HeroContainer = styled.div`
   background: linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.1)),
      url(${ImgBg});
   background-position: center;
   background-size: cover;
   display: flex;
   justify-content: left;
   align-items: center;
   padding: 0 30px;
   height: 100vh;
   position: relative;
   z-index: 1;

   :before {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(
         180deg,
         rgba(0, 0, 0, 0.2) 0%,
         transparent 100%
      );
      z-index: 2;
   }
`;

export const HeroContent = styled.div`
   height: calc(100vh - 80px);
   max-height: 100%;
   padding: 0rem calc((100vw - 1300px) / 2);
`;

export const HeroItems = styled.div`
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: flex-start;
   height: 100vh;
   max-height: 100%;
   padding: 0 2rem;
   width: 650px;
   color: #fff;
   text-transform: uppercase;
   line-height: 1;
   font-weight: bold;

   @media screen and (max-width: 650px) {
      width: 100%;
   }
`;

export const HeroH1 = styled.h1`
   font-size: clamp(2.5rem, 10vw, 5rem);
   color: #1e7ecd;
   margin-bottom: 1rem;
   box-shadow: 3px 5px #1e7ecd;
   letter-spacing: 3px;
`;

export const HeroP = styled.p`
   font-size: clamp(2rem, 2.5vw, 3rem);
   margin-bottom: 2rem;
`;

export const HeroBtnWrapper = styled.div`
   margin-top: 32px;
   display: flex;
   flex-direction: column;
   align-items: center;
`;

export const ArrowForward = styled(MdArrowForward)`
   margin-top: 8px;
   font-size: 20px;
`;
export const ArrowRight = styled(MdKeyboardArrowRight)`
   margin-top: 8px;
   font-size: 20px;
`;
