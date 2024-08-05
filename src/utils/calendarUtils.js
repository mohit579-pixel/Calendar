// src/utils/calendarUtils.js

export function generateMonthDays(year, month) {
    const days = [];
    const date = new Date(year, month, 1); // Start of the month
    const monthName = date.toLocaleString('default', { month: 'long' });
  
    while (date.getMonth() === month) {
      days.push({
        date: date.getDate(),
        day: date.toLocaleDateString('default', { weekday: 'long' })
      });
      date.setDate(date.getDate() + 1);
    }
  
    return { name: monthName, days };
  }
  