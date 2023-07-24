// Import packages
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

// Import type
import { GraphData } from '../../../app.model';

const BarPlot = ({ data }: { data: GraphData[] | undefined }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  Chart.register(...registerables);

  const years = data && data.map((item) => item.year);
  const avgBudget = data && data.map((item) => item.averageProductionBudget);

  useEffect(() => {
    setIsMobileScreen(window.innerWidth < 700);
  }, []);

  const plotDataConfig = {
    labels: years,
    datasets: [
      {
        label: 'Avg. Production Budget',
        data: avgBudget,
        backgroundColor: '#007FFF',
      },
    ],
  };

  const options = {
    responsive: isMobileScreen ? false : true,
    maintainAspectRatio: isMobileScreen ? false : true,
    plugins: {
      title: {
        display: true,
        text: 'Average Production Budget Per Year',
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
          text: 'Average Production Budget',
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
    <Bar data={plotDataConfig} options={options} className='bar-plot'/>
  );
};

export default BarPlot;
