import express from 'express';
import { kpiData, trendData, featureData, monitorDataMap, realtimeActivities, pcTopFeatures, mobileTopFeatures } from '../data/dashboard.js';

const router = express.Router();

const timeLabels = { '1': '昨日', '7': '近7天', '14': '近14天', '30': '近30天' };

const generateVariance = (timeRange, baseValue, maxVariancePercent = 0.3) => {
  let varianceFactor = 1;
  if (timeRange === '1') {
    varianceFactor = 0.5;
  } else if (timeRange === '14') {
    varianceFactor = 1.5;
  } else if (timeRange === '30') {
    varianceFactor = 2;
  }
  const variance = Math.floor(baseValue * maxVariancePercent * varianceFactor * (Math.random() * 2 - 1));
  return Math.max(0, baseValue + variance);
};

router.get('/kpi', (req, res) => {
  res.json(kpiData);
});

router.get('/trend', (req, res) => {
  res.json(trendData);
});

router.get('/feature', (req, res) => {
  res.json(featureData);
});

router.get('/top-features/pc', (req, res) => {
  const { timeRange = '7' } = req.query;
  
  const adjustedFeatures = pcTopFeatures.map(feature => {
    const adjustedUsage = generateVariance(timeRange, feature.usage);
    const adjustedPercentage = feature.percentage + (Math.random() * 4 - 2);
    const adjustedTrendValue = feature.trendValue + (Math.random() * 6 - 3);
    
    return {
      ...feature,
      usage: adjustedUsage,
      percentage: Math.max(0, Math.min(100, adjustedPercentage)),
      trendValue: Math.max(0, Math.round(adjustedTrendValue * 10) / 10)
    };
  });
  
  res.json({
    timeLabel: timeLabels[timeRange],
    features: adjustedFeatures
  });
});

router.get('/top-features/mobile', (req, res) => {
  const { timeRange = '7' } = req.query;
  
  const adjustedFeatures = mobileTopFeatures.map(feature => {
    const adjustedUsage = generateVariance(timeRange, feature.usage);
    const adjustedPercentage = feature.percentage + (Math.random() * 4 - 2);
    const adjustedTrendValue = feature.trendValue + (Math.random() * 6 - 3);
    
    return {
      ...feature,
      usage: adjustedUsage,
      percentage: Math.max(0, Math.min(100, adjustedPercentage)),
      trendValue: Math.max(0, Math.round(adjustedTrendValue * 10) / 10)
    };
  });
  
  res.json({
    timeLabel: timeLabels[timeRange],
    features: adjustedFeatures
  });
});

router.get('/monitor/:type', (req, res) => {
  const { type } = req.params;
  const { timeRange = '7' } = req.query;
  
  if (!monitorDataMap[type]) {
    return res.status(404).json({ error: 'Monitor type not found' });
  }
  
  const config = monitorDataMap[type];
  let baseData = [...config.data];
  let variance = 0;
  
  if (timeRange === '1') {
    variance = Math.floor(Math.random() * 8) - 4;
  } else if (timeRange === '14') {
    variance = Math.floor(Math.random() * 4) - 2;
  } else if (timeRange === '30') {
    variance = Math.floor(Math.random() * 10) - 5;
  }
  
  let newData0 = Math.max(0, Math.min(100, baseData[0] + variance));
  let newData1 = 100 - newData0;
  
  res.json({
    labels: config.labels,
    data: [newData0, newData1],
    colors: config.colors,
    advice: config.advice.replace('目前', `[${timeLabels[timeRange]}] `)
  });
});

router.get('/realtime', (req, res) => {
  res.json(realtimeActivities);
});

export default router;
