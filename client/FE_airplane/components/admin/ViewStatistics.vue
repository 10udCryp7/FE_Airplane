<template>
    <section>
      <h3>Xem và thống kê đặt vé của khách hàng</h3>
      <div v-if="statistics.length">
        <h4>Thống kê theo ngày và tháng:</h4>
        <canvas id="dailyChart" style="max-width: 600px; margin-bottom: 20px;"></canvas>
        <canvas id="monthlyChart" style="max-width: 600px; margin-bottom: 20px;"></canvas>
        <canvas id="destinationChart" style="max-width: 600px; margin-bottom: 20px;"></canvas>
      </div>
      <div v-else>
        <p>Không có dữ liệu để hiển thị.</p>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { Chart } from 'chart.js';
  
  const statistics = ref([]);
  
  const renderChart = (chartId, labels, data, title) => {
    const ctx = document.getElementById(chartId).getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [
          {
            label: title,
            data: data,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };
  
  const fetchStatistics = () => {
    // Comment lại phần axios fetch
    /*
    const userId = 400;
    const bookingDate = '2024-11-28';
    const dailyResponse = await axios.get(`http://localhost:3456/api/analyze/daily?userId=${userId}&bookingDate=${bookingDate}`, {
      withCredentials: true,
    });
    const monthlyResponse = await axios.get(`http://localhost:3456/api/analyze/monthly?userId=${userId}&bookingDate=${bookingDate}`, {
      withCredentials: true,
    });
    const destinationResponse = await axios.get('http://localhost:3456/api/analyze/des?destination=Port%20Brownshire', {
      withCredentials: true,
    });
    */
  
    // Dữ liệu giả lập
    const bookingDate = ref('2024-11-28');
  
    // Dữ liệu cho biểu đồ hàng ngày
    const dailyLabels = ref([bookingDate, '2024-11-29', '2024-11-30', '2024-12-01']);
    const dailyData = ref([150, 200, 180, 220]);
  
    // Dữ liệu cho biểu đồ hàng tháng
    const monthlyLabels = ref(['Tháng 10/2024', 'Tháng 11/2024', 'Tháng 12/2024']);
    const monthlyData = ref([4200, 4800, 5300]);
  
    // Dữ liệu cho biểu đồ điểm đến
    const destinationLabels = ref(['Port Brownshire', 'South Bend', 'New Haven', 'Springfield', 'Greenwood']);
    const destinationData = ref([230, 145, 90, 310, 275]);
  
    // Vẽ biểu đồ
    renderChart('dailyChart', dailyLabels, dailyData, 'Số lượng đặt vé hàng ngày');
    renderChart('monthlyChart', monthlyLabels, monthlyData, 'Số lượng đặt vé hàng tháng');
    renderChart('destinationChart', destinationLabels, destinationData, 'Số lượng đặt vé theo điểm đến');
  };
  
  onMounted(() => {
    fetchStatistics();
  });
  </script>
  
  <style scoped>
  canvas {
    display: block;
    margin: 0 auto;
  }
  </style>
  