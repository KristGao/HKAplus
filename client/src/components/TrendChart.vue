<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">近7日活躍設備趨勢</h2>
      <span class="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">目標：提升移動端粘性</span>
    </div>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif'
Chart.defaults.color = '#64748b'

const props = defineProps({
  trend: {
    type: Object,
    default: () => null
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!props.trend || !chartRef.value) return
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  chartInstance = new Chart(chartRef.value, {
    type: 'line',
    data: {
      labels: props.trend.labels,
      datasets: [
        {
          label: '移動端 (APP/小程序)',
          data: props.trend.mobile,
          borderColor: '#10b981',
          backgroundColor: 'rgba(16, 185, 129, 0.1)',
          borderWidth: 3,
          tension: 0.4,
          fill: true
        },
        {
          label: 'PC網頁端',
          data: props.trend.pc,
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          borderWidth: 2,
          borderDash: [5, 5],
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      plugins: {
        legend: { position: 'top', align: 'end' }
      },
      scales: {
        y: { beginAtZero: true, grid: { borderDash: [2, 4], color: '#f1f5f9' } },
        x: { grid: { display: false } }
      }
    }
  })
}

watch(() => props.trend, initChart, { deep: true })
onMounted(initChart)
</script>
