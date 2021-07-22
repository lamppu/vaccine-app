import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import './DoughnutChart.css'


const DoughnutChart = ({orders, title, dataArr, labelsArr}) => {
  if (orders === 0) {
    return null;
  }
  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: title,
        data: dataArr,
        backgroundColor: [
          'rgb(255, 99, 132)',
          'rgb(54, 162, 235)',
          'rgb(255, 205, 86)'
        ]
      }
    ]

  }
  const options = {
    plugins: {
      title: {
        display: true,
        text: title
      }
    }
  }

  return (
    <div className='Doughnut'>
      <Doughnut
        data={data}
        options={options}
      />
    </div>

  )
}

export default DoughnutChart;
