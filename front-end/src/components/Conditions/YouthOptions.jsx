import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as YouthSVG} from "../../Image/./SVG/youth1.svg"
import {ReactComponent as YouthSVG2} from "../../Image/./SVG/youth2.svg"
import {ReactComponent as YouthSVG3} from "../../Image/./SVG/youth3.svg"

import './Conditions.css';

const YouthOptions = () => {
  return (
    <div className="youth">
      <FadeIn>
        <YouthSVG className="SVG" />
        <YouthSVG2 className="SVG" />
        <YouthSVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default YouthOptions;