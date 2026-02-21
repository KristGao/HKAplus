<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 flex flex-col relative group hover:shadow-md transition">
    <button
      @click="$emit('remove', card.id)"
      class="absolute top-3 right-3 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity bg-white rounded-full p-1"
      title="移除該監控"
    >
      <i class="fas fa-times"></i>
    </button>
    
    <div class="flex justify-between items-center mb-4 pr-6">
      <h2 class="text-md font-semibold text-gray-800">自定義大盤監控</h2>
      <div class="flex space-x-2">
        <select
          v-model="timeRange"
          class="text-xs border-gray-300 rounded-md text-gray-500 focus:ring-blue-500 focus:border-blue-500 p-1 bg-gray-50 cursor-pointer outline-none hover:bg-gray-100 transition"
        >
          <option value="1">昨日</option>
          <option value="7">近7天</option>
          <option value="14">近14天</option>
          <option value="30">近30天</option>
        </select>
        <select
          v-model="monitorType"
          class="text-sm border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1 bg-gray-50 cursor-pointer outline-none hover:bg-gray-100 transition"
        >
          <option value="listing">房源錄入(放盤)</option>
          <option value="followup">客戶跟進/帶看</option>
          <option value="contract">電子合同簽署</option>
          <option value="share">房源營銷分享</option>
        </select>
      </div>
    </div>
    <div class="chart-container-sm">
      <canvas :ref="el => chartRef = el"></canvas>
    </div>
    <div v-if="advice" class="mt-auto pt-4" v-html="adviceHtml"></div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { Chart, registerables } from 'chart.js'
import { fetchMonitor } from '../api/dashboard.js'

Chart.register(...registerables)

const props = defineProps({
  card: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['remove'])

const chartRef = ref(null)
const monitorType = ref(props.card.type)
const timeRange = ref('7')
const advice = ref('')
let chartInstance = null

const adviceHtml = computed(() => {
  if (!advice.value) return ''
  const bgColor = monitorType.value === 'listing' || monitorType.value === 'contract' 
    ? 'bg-blue-50 text-blue-800' 
    : 'bg-green-50 text-green-800'
  const icon = monitorType.value === 'listing' || monitorType.value === 'contract'
    ? 'fa-lightbulb'
    : 'fa-bullseye'
  const label = monitorType.value === 'listing' || monitorType.value === 'contract'
    ? '運營建議：'
    : '達成情況：'
  return `<div class="${bgColor} p-3 rounded-lg text-sm animate-fade-in"><i class="fas ${icon} mr-1"></i> <strong>${label}</strong> ${advice.value}</div>`
})

const loadChart = async () => {
  if (!chartRef.value) return
  
  try {
    const data = await fetchMonitor(monitorType.value, timeRange.value)
    advice.value = data.advice
    
    if (chartInstance) {
      chartInstance.data.labels = data.labels
      chartInstance.data.datasets[0].data = data.data
      chartInstance.data.datasets[0].backgroundColor = data.colors
      chartInstance.update()
    } else {
      chartInstance = new Chart(chartRef.value, {
        type: 'doughnut',
        data: {
          labels: data.labels,
          datasets: [{
            data: data.data,
            backgroundColor: data.colors,
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          cutout: '60%',
          plugins: {
            legend: {
              position: 'bottom',
              labels: { padding: 15, usePointStyle: true }
            }
          }
        }
      })
    }
  } catch (error) {
    console.error('Failed to load monitor data:', error)
  }
}

watch([monitorType, timeRange], loadChart)

onMounted(loadChart)

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.destroy()
  }
})
</script>
