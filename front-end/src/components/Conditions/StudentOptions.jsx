import React from "react";
import { FadeIn } from "react-anim-kit";

import {ReactComponent as StudentSVG} from "../../Image/./SVG/student1.svg"
import {ReactComponent as StudentSVG2} from "../../Image/./SVG/student2.svg"
import {ReactComponent as StudentSVG3} from "../../Image/./SVG/student3.svg"

import './Conditions.css';

const StudentOptions = () => {
  return (
    <div className="student">
      <FadeIn>
        <StudentSVG className="SVG" />
        <StudentSVG2 className="SVG" />
        <StudentSVG3 className="SVG" />
      </FadeIn>
    </div>
  );
};

export default StudentOptions;