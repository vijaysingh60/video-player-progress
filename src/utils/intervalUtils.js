
export const addInterval = (intervals, newInterval) => {
  if (!newInterval) return intervals;
  
  const validIntervals = (intervals || []).filter(interval => interval != null);
  const updatedIntervals = [...validIntervals, newInterval];
  
  if (updatedIntervals.length <= 1) {
    return updatedIntervals;
  }
  
  updatedIntervals.sort((a, b) => a.start - b.start);
  
  const mergedIntervals = [];
  let currentInterval = updatedIntervals[0];
  
  for (let i = 1; i < updatedIntervals.length; i++) {
    const nextInterval = updatedIntervals[i];
    
    if (nextInterval.start <= currentInterval.end) {
      currentInterval.end = Math.max(currentInterval.end, nextInterval.end);
    } else {
      mergedIntervals.push(currentInterval);
      currentInterval = nextInterval;
    }
  }
  
  mergedIntervals.push(currentInterval);
  
  return mergedIntervals;
};


export const calculateTotalWatchedTime = (intervals) => {
  if (!intervals?.length) return 0;
  return intervals.reduce((total, interval) => {
    return total + (interval.end - interval.start);
  }, 0);
};


export const calculateProgressPercentage = (watchedTime, totalDuration) => {
  if (totalDuration === 0) return 0;
  const percentage = (watchedTime / totalDuration) * 100;
  return Math.min(Math.round(percentage * 10) / 10, 100); 
};