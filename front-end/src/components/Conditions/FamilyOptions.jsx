import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as FamilySVG} from "../../Image/./SVG/family1.svg"
import {ReactComponent as FamilySVG2} from "../../Image/./SVG/family2.svg"
import {ReactComponent as FamilySVG3} from "../../Image/./SVG/family3.svg"

import './Conditions.css';

const FamilyOptions = () => {
  return (
    <div className="family">
      <FadeIn>
        <FamilySVG className="SVG" />
        <FamilySVG2 className="SVG" />
        <FamilySVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default FamilyOptions;