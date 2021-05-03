import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as WorkerSVG} from "../../Image/./SVG/worker1.svg"
import {ReactComponent as WorkerSVG2} from "../../Image/./SVG/worker2.svg"
import {ReactComponent as WorkerSVG3} from "../../Image/./SVG/worker3.svg"

import './Conditions.css';

const WorkerOptions = () => {
  return (
    <div className="old">
      <FadeIn>
        <WorkerSVG className="SVG" />
        <WorkerSVG2 className="SVG" />
        <WorkerSVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default WorkerOptions;