// Import packages
import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';


// Import type
import { GraphData } from '../../../app.model';

const ScatterPlot = ({ data }: { data: GraphData[] | undefined }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  Chart.register(...registerables);

  const years = data && data.map((item) => item.year);
  const countData = data && data.map((item) => ({
    x: item.year,
    y: item.moviesCount,
  }));

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 700);
  }, []);

  const plotDataConfig = {
    labels: years,
    datasets: [
      {
        label: 'Number of Releases',
        data: countData,
        backgroundColor: 'orange',
        borderColor: '#f36c6d',
        pointBorderColor: 'orange',
        pointStyle: 'circle',
        pointRadius: isMobileScreen ? 2 : 5,
        pointHoverRadius: isMobileScreen ? 5 : 10,
        tension: 0.5,
        borderDash: isMobileScreen ? [5] : [10],
      },
    ],
  };

  const options = {
    responsive: isMobileScreen ? false : true,
    maintainAspectRatio: isMobileScreen ? false : true,
    plugins: {
      title: {
        display: true,
        text: 'Number of Releases Per Year',
        font: {
          size: isMobileScreen ? 10 : 16,
        },
      },
      legend: {
        labels: {
          font: {
            size: isMobileScreen ? 9 : 14,
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        title: {
          display: true,
          text: 'Year',
          font: {
            size: isMobileScreen ? 8 : 16,
          },
        },
        ticks: {
          font: {
            size: isMobileScreen ? 6 : 12,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: 'Number of Releases',
          font: {
            size: isMobileScreen ? 8 : 16,
          },
        },
        ticks: {
          font: {
            size: isMobileScreen ? 6 : 12,
          },
        },
      },
    },
  };

  return (
    <Line data={plotDataConfig} options={options} className='scatter-plot'/>
  );
};

export default ScatterPlot;
