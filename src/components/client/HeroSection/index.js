import React from "react";
import {
  HeroContainer,
  HeroContent,
  HeroItems,
  HeroH1,
  HeroP,
} from "./HeroElements";

function HeroSection() {
  return (
    <HeroContainer>
      <HeroContent>
        <HeroItems>
          <HeroH1>Los cachimbos</HeroH1>
          <HeroP>Best place ever</HeroP>
        </HeroItems>
      </HeroContent>
    </HeroContainer>
  );
}

export default HeroSection;
