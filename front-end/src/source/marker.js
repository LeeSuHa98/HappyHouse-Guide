import react, { Component } from "react";
import Proptypes from 'prop-types'

function marker({btrcCode, signguCode, numOfRows, pageNo}){
    return <div>
        <br>{btrcCode}</br>
        <br>{signguCode}</br>
        <br>{numOfRows}</br>
        <br>{pageNo}</br>
        </div>;
}
marker.prototype = {
    btrcCode: Proptypes.string.isRequired
};
export default marker;