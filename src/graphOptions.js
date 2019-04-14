export const options = {
  legend: {
    position: 'bottom'
  },
  title: {
    display: true,
    text: 'Colors - Gender Chart',
    fontSize: '24'
  },
  layout: {
    padding: {
      left: 100,
      right: 100,
      top: 40,
      bottom: 0
    }
  },
  animation: {
    duration: 2000
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
};
