import React from "react";
import {
   ProductsContainer,
   ProductWrapper,
   ProductsHeading,
   ProductTitle,
   ProductCard,
   ProductImg,
   ProductInfo,
   ProductDesc,
   ProductPrice,
   HeroBtnWrapper,
} from "./MenuElements";

import { Button } from "../ButtonElements";

const Menu = ({ heading, data, props, id }) => {
   return (
      <ProductsContainer lightBg={props.lightBg} id={id}>
         <ProductsHeading greenHeader={props.greenHeader}>
            {heading}
         </ProductsHeading>
         <ProductWrapper>
            {data.map((product) => {
               return product.show === true ? (
                  <ProductCard key={product.id}>
                     <ProductImg src={product.url} lightBg={props.lightBg} />
                     <ProductInfo>
                        <ProductTitle lightBg={props.lightBg}>
                           {product.name}
                        </ProductTitle>
                        <ProductDesc lightBg={props.lightBg}>
                           {product.description}
                        </ProductDesc>
                        <ProductPrice lightBg={props.lightBg}>
                           ${product.price}
                        </ProductPrice>
                        {/* <HeroBtnWrapper>
                           <Button primary="true" dark="true">
                              Agregar al pedido
                           </Button>
                        </HeroBtnWrapper> */}
                     </ProductInfo>
                  </ProductCard>
               ) : (
                  ""
               );
            })}
         </ProductWrapper>
      </ProductsContainer>
   );
};

export default Menu;
