import React, {useState, useEffect} from 'react';
import {Bar} from 'react-chartjs-2';
import axios from 'axios';

const HappyChart = (props) => {
    const data = {
        labels: ['Convenience', 'Safety', 'Medical'],
        datasets: [
          {
            label: props.danjiName,
            backgroundColor: ['rgba(255,99,132,0.2)','rgba(54, 162, 235, 0.2)','rgba(255, 206, 86, 0.2)'],
            borderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(255,99,132,0.4)','rgba(54, 162, 235, 0.4)','rgba(255, 206, 86, 0.4)'],
            hoverBorderColor: ['rgba(255,99,132,1)','rgba(54, 162, 235, 1)','rgba(255, 206, 86, 1)'],
            data: [props.convenience, props.safety, props.medical]
          }
        ]
      };

  return (
    <div className="chart-container">
        <Bar
            data={data}
            options={{
              maintainAspectRatio: false
            }}
          />
    </div>
  );
};

export default React.memo(HappyChart);