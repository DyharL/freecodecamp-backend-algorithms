/**
 * freeCodeCamp Scientific Computing Project 02: Time Calculator
 * Adds duration to a 12-hour clock start time with rollover day and day-of-week tracking.
 */

const DAYS_OF_WEEK = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday'
];

export function addTime(start: string, duration: string, startingDay?: string): string {
  // Parse start time (e.g. "3:00 PM", "11:43 AM")
  const startParts = start.trim().split(/\s+/);
  const [startClock, period] = startParts;
  const [startHourStr, startMinuteStr] = startClock.split(':');

  let startHour = parseInt(startHourStr, 10);
  const startMinute = parseInt(startMinuteStr, 10);

  // Convert to 24-hour minutes from midnight
  if (period.toUpperCase() === 'PM' && startHour !== 12) {
    startHour += 12;
  } else if (period.toUpperCase() === 'AM' && startHour === 12) {
    startHour = 0;
  }

  // Parse duration (e.g. "3:10", "24:20")
  const [durHourStr, durMinuteStr] = duration.trim().split(':');
  const durHour = parseInt(durHourStr, 10);
  const durMinute = parseInt(durMinuteStr, 10);

  // Total elapsed minutes
  const totalMinutes = startMinute + durMinute;
  const extraHours = Math.floor(totalMinutes / 60);
  const finalMinute = totalMinutes % 60;

  const totalHours = startHour + durHour + extraHours;
  const daysLater = Math.floor(totalHours / 24);
  const finalHour24 = totalHours % 24;

  // Convert back to 12-hour format
  const finalPeriod = finalHour24 >= 12 ? 'PM' : 'AM';
  let finalHour12 = finalHour24 % 12;
  if (finalHour12 === 0) {
    finalHour12 = 12;
  }

  const paddedMinutes = finalMinute.toString().padStart(2, '0');
  let result = `${finalHour12}:${paddedMinutes} ${finalPeriod}`;

  // Calculate day of the week if provided
  if (startingDay && startingDay.trim() !== '') {
    const cleanDay = startingDay.trim().toLowerCase();
    const dayIndex = DAYS_OF_WEEK.findIndex((d) => d.toLowerCase() === cleanDay);
    if (dayIndex !== -1) {
      const finalDayIndex = (dayIndex + daysLater) % 7;
      result += `, ${DAYS_OF_WEEK[finalDayIndex]}`;
    }
  }

  // Add days later suffix
  if (daysLater === 1) {
    result += ' (next day)';
  } else if (daysLater > 1) {
    result += ` (${daysLater} days later)`;
  }

  return result;
}
