import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as BenefitSVG} from "../../Image/./SVG/benefit1.svg"
import {ReactComponent as BenefitSVG2} from "../../Image/./SVG/benefit2.svg"
import {ReactComponent as BenefitSVG3} from "../../Image/./SVG/benefit3.svg"

import './Conditions.css';

const BenefitOptions = () => {
  return (
    <div className="old">
      <FadeIn>
        <BenefitSVG className="SVG" />
        <BenefitSVG2 className="SVG" />
        <BenefitSVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default BenefitOptions;