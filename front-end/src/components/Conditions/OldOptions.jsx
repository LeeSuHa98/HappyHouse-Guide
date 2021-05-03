import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as OldSVG} from "../../Image/./SVG/old1.svg"
import {ReactComponent as OldSVG2} from "../../Image/./SVG/old2.svg"
import {ReactComponent as OldSVG3} from "../../Image/./SVG/old3.svg"

import './Conditions.css';

const OldOptions = () => {
  return (
    <div className="old">
      <FadeIn>
        <OldSVG className="SVG" />
        <OldSVG2 className="SVG" />
        <OldSVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default OldOptions;