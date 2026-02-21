<template>
  <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">
        <i class="fas fa-chart-bar text-purple-500 mr-2"></i>十大功能使用情況
      </h2>
      <select
        v-model="timeRange"
        class="text-sm border-gray-300 rounded-md text-gray-600 focus:ring-blue-500 focus:border-blue-500 p-1.5 bg-gray-50 cursor-pointer outline-none hover:bg-gray-100 transition"
      >
        <option value="1">昨日</option>
        <option value="7">近7天</option>
        <option value="14">近14天</option>
        <option value="30">近30天</option>
      </select>
    </div>
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-700">
            <i class="fas fa-laptop text-pc mr-1"></i>PC端
          </h3>
          <span class="px-2 py-0.5 bg-blue-100 text-pc text-xs rounded-full">{{ pcTimeLabel }}</span>
        </div>
        <div class="space-y-2">
          <div
            v-for="feature in pcFeatures"
            :key="feature.rank"
            class="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition group"
          >
            <div
              :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2.5',
                feature.rank <= 3 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              ]"
            >
              {{ feature.rank }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-gray-800 text-sm truncate">{{ feature.name }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500">{{ feature.usage.toLocaleString() }}次</span>
                  <span
                    :class="[
                      'text-xs font-medium flex items-center',
                      feature.trend === 'up' ? 'text-green-500' : feature.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    ]"
                  >
                    <i
                      :class="[
                        'mr-0.5 text-[10px]',
                        feature.trend === 'up' ? 'fas fa-arrow-up' : feature.trend === 'down' ? 'fas fa-arrow-down' : 'fas fa-minus'
                      ]"
                    ></i>
                    {{ feature.trendValue > 0 ? feature.trendValue + '%' : '-' }}
                  </span>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  class="bg-pc h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: feature.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between mb-3">
          <h3 class="text-sm font-medium text-gray-700">
            <i class="fas fa-mobile-alt text-mobile mr-1"></i>移動端
          </h3>
          <span class="px-2 py-0.5 bg-green-100 text-mobile text-xs rounded-full">{{ mobileTimeLabel }}</span>
        </div>
        <div class="space-y-2">
          <div
            v-for="feature in mobileFeatures"
            :key="feature.rank"
            class="flex items-center p-2.5 rounded-lg hover:bg-gray-50 transition group"
          >
            <div
              :class="[
                'w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mr-2.5',
                feature.rank <= 3 ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'
              ]"
            >
              {{ feature.rank }}
            </div>
            <div class="flex-1 min-w-0">
              <div class="flex items-center justify-between mb-1">
                <span class="font-medium text-gray-800 text-sm truncate">{{ feature.name }}</span>
                <div class="flex items-center space-x-2">
                  <span class="text-xs text-gray-500">{{ feature.usage.toLocaleString() }}次</span>
                  <span
                    :class="[
                      'text-xs font-medium flex items-center',
                      feature.trend === 'up' ? 'text-green-500' : feature.trend === 'down' ? 'text-red-500' : 'text-gray-400'
                    ]"
                  >
                    <i
                      :class="[
                        'mr-0.5 text-[10px]',
                        feature.trend === 'up' ? 'fas fa-arrow-up' : feature.trend === 'down' ? 'fas fa-arrow-down' : 'fas fa-minus'
                      ]"
                    ></i>
                    {{ feature.trendValue > 0 ? feature.trendValue + '%' : '-' }}
                  </span>
                </div>
              </div>
              <div class="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  class="bg-mobile h-1.5 rounded-full transition-all duration-300"
                  :style="{ width: feature.percentage + '%' }"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { fetchPcTopFeatures, fetchMobileTopFeatures } from '../api/dashboard.js'

const pcFeatures = ref([])
const mobileFeatures = ref([])
const pcTimeLabel = ref('近7天')
const mobileTimeLabel = ref('近7天')
const timeRange = ref('7')

const loadData = async () => {
  try {
    const [pcData, mobileData] = await Promise.all([
      fetchPcTopFeatures(timeRange.value),
      fetchMobileTopFeatures(timeRange.value)
    ])
    pcFeatures.value = pcData.features
    mobileFeatures.value = mobileData.features
    pcTimeLabel.value = pcData.timeLabel
    mobileTimeLabel.value = mobileData.timeLabel
  } catch (error) {
    console.error('Failed to fetch top features:', error)
  }
}

watch(timeRange, loadData)

onMounted(loadData)
</script>
