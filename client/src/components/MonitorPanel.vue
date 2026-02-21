<template>
  <div class="flex-1 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">
        自定義監控面板
        <span class="text-xs font-normal text-gray-400 ml-2">可自由添加多維數據卡片</span>
      </h2>
      <button
        @click="addMonitorCard"
        class="bg-white border border-gray-200 text-blue-600 hover:bg-blue-50 px-3 py-1.5 rounded-lg text-sm font-medium shadow-sm transition flex items-center"
      >
        <i class="fas fa-plus mr-1"></i> 添加看板
      </button>
    </div>
    <div ref="cardsContainer" class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <MonitorCard
        v-for="card in monitorCards"
        :key="card.id"
        :card="card"
        :ref="el => setCardRef(card.id, el)"
        @remove="removeMonitorCard"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick, onMounted } from 'vue'
import MonitorCard from './MonitorCard.vue'

const monitorCards = ref([])
const cardRefs = {}
const cardsContainer = ref(null)
let cardIdCounter = 0

const monitorTypes = ['listing', 'followup', 'contract', 'share']

const setCardRef = (cardId, el) => {
  if (el) {
    cardRefs[cardId] = el
  }
}

const addMonitorCard = async () => {
  const randomType = monitorTypes[Math.floor(Math.random() * monitorTypes.length)]
  const newCardId = `card-${++cardIdCounter}`
  
  monitorCards.value.push({
    id: newCardId,
    type: randomType
  })
  
  await nextTick()
  
  const cardEl = cardRefs[newCardId]
  if (cardEl && cardEl.$el) {
    cardEl.$el.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
}

const removeMonitorCard = (cardId) => {
  monitorCards.value = monitorCards.value.filter(c => c.id !== cardId)
  delete cardRefs[cardId]
}

onMounted(() => {
  monitorCards.value.push(
    { id: `card-${++cardIdCounter}`, type: 'listing' },
    { id: `card-${++cardIdCounter}`, type: 'followup' }
  )
})
</script>
