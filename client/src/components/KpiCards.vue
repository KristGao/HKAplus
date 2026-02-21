<template>
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500">今日活躍用戶 (DAU)</p>
          <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ kpi?.dau?.total?.toLocaleString() || '-' }}</h3>
        </div>
        <div class="p-3 bg-indigo-50 rounded-lg text-indigo-500">
          <i class="fas fa-users text-xl"></i>
        </div>
      </div>
      <div class="mt-4 flex items-center text-sm">
        <span :class="kpi?.dau?.trendDirection === 'up' ? 'text-green-500' : 'text-red-500'" class="font-medium flex items-center">
          <i :class="kpi?.dau?.trendDirection === 'up' ? 'fas fa-arrow-up' : 'fas fa-arrow-down'" class="mr-1"></i>
          {{ kpi?.dau?.trend }}%
        </span>
        <span class="text-gray-400 ml-2">較昨日</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500">移動端日活 (APP)</p>
          <h3 class="text-3xl font-bold text-mobile mt-2">{{ kpi?.mobileDau?.total?.toLocaleString() || '-' }}</h3>
        </div>
        <div class="p-3 bg-green-50 rounded-lg text-mobile">
          <i class="fas fa-mobile-alt text-xl px-1"></i>
        </div>
      </div>
      <div class="mt-4 flex items-center text-sm">
        <span class="text-green-500 font-medium flex items-center">
          <i class="fas fa-arrow-up mr-1"></i> {{ kpi?.mobileDau?.trend }}%
        </span>
        <span class="text-gray-400 ml-2">{{ kpi?.mobileDau?.note }}</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500">PC端日活 (網頁端)</p>
          <h3 class="text-3xl font-bold text-pc mt-2">{{ kpi?.pcDau?.total?.toLocaleString() || '-' }}</h3>
        </div>
        <div class="p-3 bg-blue-50 rounded-lg text-pc">
          <i class="fas fa-laptop text-xl"></i>
        </div>
      </div>
      <div class="mt-4 flex items-center text-sm">
        <span class="text-red-400 font-medium flex items-center">
          <i class="fas fa-arrow-down mr-1"></i> {{ kpi?.pcDau?.trend }}%
        </span>
        <span class="text-gray-400 ml-2">{{ kpi?.pcDau?.note }}</span>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition">
      <div class="flex justify-between items-start">
        <div>
          <p class="text-sm font-medium text-gray-500">今日新增放盤量</p>
          <h3 class="text-3xl font-bold text-gray-800 mt-2">{{ kpi?.newListing?.total || '-' }}</h3>
        </div>
        <div class="p-3 bg-orange-50 rounded-lg text-orange-500">
          <i class="fas fa-key text-xl"></i>
        </div>
      </div>
      <div class="mt-4 flex items-center text-sm">
        <span class="text-gray-500 font-medium">PC端貢獻: <span class="text-pc font-bold">{{ kpi?.newListing?.pcContribution }}%</span></span>
        <i class="fas fa-check-circle text-green-500 ml-2" title="符合預期：核心操作保留在PC"></i>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  kpi: {
    type: Object,
    default: () => null
  }
})
</script>
