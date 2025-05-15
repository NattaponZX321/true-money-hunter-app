// Format remaining time with seconds for real-time display
export const formatRemainingTimeRealtime = (
  remainingTime: { days: number; hours: number; minutes: number; seconds: number }
): string => {
  const { days, hours, minutes, seconds } = remainingTime;
  return `${days} วัน ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

// Format time segments with leading zeros
export const formatTimeSegment = (value: number): string => {
  return value.toString().padStart(2, '0');
};
