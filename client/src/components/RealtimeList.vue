<template>
  <div class="w-full xl:w-96 flex-shrink-0">
    <div class="bg-white rounded-xl shadow-sm p-0 border border-gray-100 flex flex-col h-full overflow-hidden">
      <div class="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
        <h2 class="text-md font-semibold text-gray-800">今日業務實時跟蹤</h2>
        <span class="relative flex h-3 w-3">
          <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
        </span>
      </div>
      <div class="p-0 flex-1 overflow-y-auto max-h-[350px] xl:max-h-[500px]">
        <ul class="divide-y divide-gray-100">
          <li
            v-for="activity in activities"
            :key="activity.id"
            class="p-4 hover:bg-gray-50 flex items-start space-x-3"
          >
            <div :class="activity.platform === 'pc' ? 'bg-blue-100 text-pc' : 'bg-green-100 text-mobile'" class="p-2 rounded-full mt-1">
              <i :class="activity.platform === 'pc' ? 'fas fa-desktop' : 'fas fa-mobile-alt px-1'" class="text-xs"></i>
            </div>
            <div class="flex-1">
              <div class="flex justify-between">
                <span class="font-medium text-sm">{{ activity.user }} ({{ activity.store }})</span>
                <span class="text-xs text-gray-400">{{ activity.time }}</span>
              </div>
              <p class="text-xs text-gray-600 mt-1">
                在{{ activity.platform === 'pc' ? 'PC端' : 'APP' }}完成了
                <span :class="activity.platform === 'pc' ? 'text-blue-600' : 'text-green-600'" class="font-semibold">
                  {{ activity.action }}
                </span>
                ({{ activity.detail }})
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  activities: {
    type: Array,
    default: () => []
  }
})
</script>
