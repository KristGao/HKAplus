<template>
  <div class="flex h-screen overflow-hidden">
    <Sidebar />
    <main class="flex-1 flex flex-col overflow-hidden">
      <Header />
      <div class="flex-1 overflow-y-auto p-6 space-y-6">
        <KpiCards :kpi="kpi" />
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrendChart :trend="trend" />
          <FeatureChart :feature="feature" />
        </div>
        <TopFeatures />
        <div class="flex flex-col xl:flex-row gap-6">
          <MonitorPanel />
          <RealtimeList :activities="realtimeActivities" />
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Sidebar from './components/Sidebar.vue'
import Header from './components/Header.vue'
import KpiCards from './components/KpiCards.vue'
import TrendChart from './components/TrendChart.vue'
import FeatureChart from './components/FeatureChart.vue'
import TopFeatures from './components/TopFeatures.vue'
import MonitorPanel from './components/MonitorPanel.vue'
import RealtimeList from './components/RealtimeList.vue'
import { fetchKpi, fetchTrend, fetchFeature, fetchRealtime } from './api/dashboard.js'

const kpi = ref(null)
const trend = ref(null)
const feature = ref(null)
const realtimeActivities = ref([])

onMounted(async () => {
  try {
    const [kpiData, trendData, featureData, realtimeData] = await Promise.all([
      fetchKpi(),
      fetchTrend(),
      fetchFeature(),
      fetchRealtime()
    ])
    kpi.value = kpiData
    trend.value = trendData
    feature.value = featureData
    realtimeActivities.value = realtimeData
  } catch (error) {
    console.error('Failed to fetch data:', error)
  }
})
</script>
