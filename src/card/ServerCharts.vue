<template>
    <div>
      <ChartComponent :chart-data="chartData" :options="chartOptions" />
    </div>
  </template>
  
  <!-- <script>
  import ChartComponent from '../card/ChartComponent.vue';
  
  export default {
    components: {
      ChartComponent
    },
    data() {
      return {
        chartData: {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [{
            label: 'Data',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1,
            data: [65, 59, 80, 81, 56, 55, 40]
          }]
        },
        chartOptions: {
          responsive: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }
      };
    }
  };
  </script>
   -->
  <style scoped>
  /* Add any custom styling here */
  </style>
  