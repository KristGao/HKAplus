export const kpiData = {
  dau: {
    total: 1284,
    trend: 5.2,
    trendDirection: 'up'
  },
  mobileDau: {
    total: 1056,
    trend: 12.4,
    trendDirection: 'up',
    note: '推廣活動效果顯著'
  },
  pcDau: {
    total: 642,
    trend: 3.1,
    trendDirection: 'down',
    note: '部分流量成功向APP轉移'
  },
  newListing: {
    total: 315,
    pcContribution: 88
  }
};

export const trendData = {
  labels: ['10-18', '10-19', '10-20', '10-21', '10-22', '10-23', '今日'],
  mobile: [720, 780, 750, 890, 950, 1020, 1056],
  pc: [680, 690, 650, 640, 660, 650, 642]
};

export const featureData = {
  labels: ['新房源錄入(放盤)', '合同/業績錄入', '房源精確搜尋', '客戶跟進錄入', '帶看記錄簽到', '房源朋友圈分享'],
  pc: [82, 95, 45, 15, 5, 2],
  mobile: [18, 5, 55, 85, 95, 98]
};

export const pcTopFeatures = [
  { rank: 1, name: '房源錄入(放盤)', usage: 2856, percentage: 15.2, trend: 'up', trendValue: 8.5 },
  { rank: 2, name: '合同管理', usage: 2341, percentage: 12.4, trend: 'up', trendValue: 5.2 },
  { rank: 3, name: '業績錄入', usage: 2156, percentage: 11.5, trend: 'down', trendValue: 2.1 },
  { rank: 4, name: '房源精確搜尋', usage: 1892, percentage: 10.1, trend: 'up', trendValue: 12.3 },
  { rank: 5, name: '客戶資料管理', usage: 1678, percentage: 8.9, trend: 'up', trendValue: 3.8 },
  { rank: 6, name: '報表導出', usage: 1456, percentage: 7.8, trend: 'up', trendValue: 6.7 },
  { rank: 7, name: '房源批量編輯', usage: 1234, percentage: 6.6, trend: 'down', trendValue: 1.5 },
  { rank: 8, name: '權限管理', usage: 1089, percentage: 5.8, trend: 'stable', trendValue: 0 },
  { rank: 9, name: '數據統計分析', usage: 987, percentage: 5.3, trend: 'up', trendValue: 15.2 },
  { rank: 10, name: '系統設置', usage: 756, percentage: 4.0, trend: 'stable', trendValue: 0 }
];

export const mobileTopFeatures = [
  { rank: 1, name: '客戶跟進錄入', usage: 4521, percentage: 18.5, trend: 'up', trendValue: 22.3 },
  { rank: 2, name: '帶看記錄簽到', usage: 3892, percentage: 15.9, trend: 'up', trendValue: 18.7 },
  { rank: 3, name: '房源一鍵分享', usage: 3456, percentage: 14.1, trend: 'up', trendValue: 25.6 },
  { rank: 4, name: '房源搜尋', usage: 2987, percentage: 12.2, trend: 'up', trendValue: 10.2 },
  { rank: 5, name: '客戶通訊錄', usage: 2567, percentage: 10.5, trend: 'up', trendValue: 8.9 },
  { rank: 6, name: '消息通知', usage: 2134, percentage: 8.7, trend: 'up', trendValue: 5.4 },
  { rank: 7, name: '房源收藏', usage: 1876, percentage: 7.7, trend: 'up', trendValue: 12.1 },
  { rank: 8, name: '日程提醒', usage: 1543, percentage: 6.3, trend: 'up', trendValue: 7.8 },
  { rank: 9, name: '極速放盤', usage: 987, percentage: 4.0, trend: 'up', trendValue: 35.2 },
  { rank: 10, name: '合同審批', usage: 523, percentage: 2.1, trend: 'up', trendValue: 45.6 }
];

export const monitorDataMap = {
  listing: {
    labels: ['PC端放盤', 'APP極速放盤'],
    data: [82, 18],
    colors: ['#3b82f6', '#10b981'],
    advice: '目前82%的放盤在PC端完成，符合"複雜操作留給PC"的定位。移動端18%主要為現場極速錄入。'
  },
  followup: {
    labels: ['PC端跟進', 'APP端跟進'],
    data: [12, 88],
    colors: ['#93c5fd', '#34d399'],
    advice: '超過88%的跟進動作已轉移至移動端，外勤效率大幅提升。'
  },
  contract: {
    labels: ['PC端合同錄入', 'APP端合同審批'],
    data: [95, 5],
    colors: ['#3b82f6', '#10b981'],
    advice: '合同錄入仍以PC為主(95%)，建議優化APP審批流程提升效率。'
  },
  share: {
    labels: ['PC端分享', 'APP端分享'],
    data: [2, 98],
    colors: ['#93c5fd', '#34d399'],
    advice: '房源分享功能已高度移動化，98%通過APP完成，符合移動社交趨勢。'
  }
};

export const realtimeActivities = [
  {
    id: 1,
    user: '王大錘',
    store: '南山二店',
    platform: 'pc',
    action: '新房源放盤',
    detail: '陽光海濱花園3居室',
    time: '2分鐘前'
  },
  {
    id: 2,
    user: '李雪',
    store: '福田中心店',
    platform: 'mobile',
    action: '帶看記錄',
    detail: '客戶: 張先生',
    time: '5分鐘前'
  },
  {
    id: 3,
    user: '陳師傅',
    store: '羅湖老街店',
    platform: 'mobile',
    action: '房源一鍵分享',
    detail: '分享到微信',
    time: '12分鐘前'
  },
  {
    id: 4,
    user: '張店長',
    store: '寶安一店',
    platform: 'pc',
    action: '房屋買賣合同',
    detail: '單號: HT20231024',
    time: '28分鐘前'
  }
];
