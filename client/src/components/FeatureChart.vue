<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">主要業務場景雙端使用分佈</h2>
      <button class="text-gray-400 hover:text-blue-500"><i class="fas fa-download"></i></button>
    </div>
    <div class="chart-container">
      <canvas ref="chartRef"></canvas>
    </div>
    <p class="text-xs text-gray-500 mt-2 text-center">洞察：帶看與跟進高度依賴APP，而放盤與合同錄入依然以PC為主。</p>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { Chart, registerables } from 'chart.js'

Chart.register(...registerables)

const props = defineProps({
  feature: {
    type: Object,
    default: () => null
  }
})

const chartRef = ref(null)
let chartInstance = null

const initChart = () => {
  if (!props.feature || !chartRef.value) return
  
  if (chartInstance) {
    chartInstance.destroy()
  }
  
  chartInstance = new Chart(chartRef.value, {
    type: 'bar',
    data: {
      labels: props.feature.labels,
      datasets: [
        {
          label: 'PC端佔比 %',
          data: props.feature.pc,
          backgroundColor: '#3b82f6',
          borderRadius: { topLeft: 4, bottomLeft: 4 }
        },
        {
          label: '移動端佔比 %',
          data: props.feature.mobile,
          backgroundColor: '#10b981',
          borderRadius: { topRight: 4, bottomRight: 4 }
        }
      ]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: { stacked: true, max: 100, ticks: { callback: (value) => value + '%' } },
        y: { stacked: true, grid: { display: false } }
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context) => context.dataset.label + ': ' + context.raw + '%'
          }
        }
      }
    }
  })
}

watch(() => props.feature, initChart, { deep: true })
onMounted(initChart)
</script>
