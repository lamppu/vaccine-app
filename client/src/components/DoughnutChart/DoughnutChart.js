import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import './DoughnutChart.css'


const DoughnutChart = ({total, title, dataArr, labelsArr}) => {
  if (total === 0) {
    return null;
  }
  const data = {
    labels: labelsArr,
    datasets: [
      {
        label: title,
        data: dataArr,
        backgroundColor: [
          'rgba(255, 99, 132)',
          'rgba(54, 162, 235)',
          'rgba(255, 206, 86)',
          'rgba(75, 192, 192)',
          'rgba(153, 102, 255)'
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
    <div className='Doughnut' data-testid='doughnut'>
      <Doughnut
        data={data}
        options={options}
      />
    </div>

  )
}

export default DoughnutChart;
