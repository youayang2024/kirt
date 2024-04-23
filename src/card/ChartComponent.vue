<template>
    <div>
      <canvas ref="chart"></canvas>
    </div>
  </template>
  
  <script>
  import { Bar, mixins } from 'vue-chartjs';
  
  export default {
    extends: Bar,
    mixins: [mixins.reactiveProp],
    props: ['chartData', 'options'],
    mounted() {
      this.renderChart(this.chartData, this.options);
    }
  };
  </script>
  
  <style scoped>
  /* Add any custom styling here */
  </style>
  