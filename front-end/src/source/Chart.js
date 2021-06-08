import React from 'react';
import {Radar} from 'react-chartjs-2';
import './css/Sidebar.css'

const HappyChart = (props) => {
    const data = {
        labels: ['편의시설', '안전', '의료'],
        datasets: [
          {
            label: props.danjiName,
            backgroundColor: ['rgba(255,99,132,0.2)'],
            borderColor: ['rgba(255,99,132,1)'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(255,99,132,0.4)'],
            hoverBorderColor: ['rgba(255,99,132,1)'],
            data: [props.convenience, props.safety, props.medical]
          },
          
          {
            label: "평균",
            backgroundColor: ['rgba(54, 162, 235, 0.2)'],
            borderColor: ['rgba(54, 162, 235, 1)'],
            borderWidth: 1,
            hoverBackgroundColor: ['rgba(54, 162, 235, 0.4)'],
            hoverBorderColor: ['rgba(54, 162, 235, 1)'],
            data: [1, 1, 1]
          }
        ]
      };

  return (
    <div className="chart-container">
        <Radar 
            data={data}
            options={
              {scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0,
                    suggestedMax: 3
                }
            }}
            }
          />
    </div>
  );
};

export default React.memo(HappyChart);