import React, { useEffect, useState } from 'react';
import { IoMdArrowBack, IoMdArrowRoundForward } from 'react-icons/io';
import { AiOutlineClose } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedDate } from '../features/calendar/calendarSlice';
import { generateMonthDays } from '../utils/calendarUtils';

const Contain = () => {
  const dispatch = useDispatch();
  const selectedDate = useSelector(state => state.calendar.selectedDate);
  const [monthData, setMonthData] = useState({ name: '', days: [] });
  const [tasks, setTasks] = useState({});
  const today = new Date();

  useEffect(() => {
    if (selectedDate) {
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      setMonthData(generateMonthDays(year, month));
    }
  }, [selectedDate]);

  const handlePreviousMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    dispatch(setSelectedDate(newDate));
  };

  const handleNextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    dispatch(setSelectedDate(newDate));
  };

  const handleDateClick = (day) => {
    const task = prompt("Enter the task:");
    if (task) {
      const dateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day}`;
      setTasks(prevTasks => ({
        ...prevTasks,
        [dateKey]: [...(prevTasks[dateKey] || []), task]
      }));
    }
  };

  const handleDragStart = (e, task, oldDateKey) => {
    e.dataTransfer.setData("task", task);
    e.dataTransfer.setData("oldDateKey", oldDateKey);
  };

  const handleDrop = (e, newDate) => {
    const task = e.dataTransfer.getData("task");
    const oldDateKey = e.dataTransfer.getData("oldDateKey");

    if (task && oldDateKey) {
      const newDateKey = `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${newDate}`;

      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        newTasks[oldDateKey] = newTasks[oldDateKey].filter(t => t !== task);
        if (newTasks[oldDateKey].length === 0) delete newTasks[oldDateKey]; // Remove key if no tasks left

        newTasks[newDateKey] = [...(newTasks[newDateKey] || []), task];
        return newTasks;
      });
    }
  };

  const handleDeleteTask = (dateKey, task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(prevTasks => {
        const newTasks = { ...prevTasks };
        newTasks[dateKey] = newTasks[dateKey].filter(t => t !== task);
        if (newTasks[dateKey].length === 0) delete newTasks[dateKey]; // Remove key if no tasks left
        return newTasks;
      });
    }
  };

  const weekdays = ["S", "M", "T", "W", "T", "F", "S"];

  const getDaysOfWeek = (monthData) => {
    const startDay = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1).getDay();
    const days = [...Array(startDay).fill(null)];
    monthData.days.forEach(day => {
      days.push(day);
    });
    return days;
  };

  return (
    <div className='w-full h-full flex items-center justify-center'>
      <div className='bg-white p-4 w-full h-full rounded-lg overflow-y-auto'>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center py-2">
            {/* Navigation Buttons */}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {weekdays.map((day, index) => (
              <div key={index} className='text-center font-bold'>
                {day}
              </div>
            ))}
            {getDaysOfWeek(monthData).map((day, index) => (
              <div
                key={index}
                className={`p-2 text-center cursor-pointer h-20 items-center flex justify-center ${day ? (new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day.date).toDateString() === today.toDateString() ? 'bg-red-200' : 'hover:bg-blue-200') : 'text-gray-400'}`}
                onClick={() => day && handleDateClick(day.date)}
                onDrop={(e) => day && handleDrop(e, day.date)}
                onDragOver={(e) => day && e.preventDefault()}
              >
                <div>
                  {day ? day.date : ''}
                  {day && (
                    <div className="mt-1 text-xs">
                      {tasks[`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day.date}`]?.map((task, i) => (
                        <div
                          key={i}
                          className="bg-blue-100 p-1 rounded mt-1 cursor-pointer flex justify-between items-center"
                          draggable
                          onDragStart={(e) => handleDragStart(e, task, `${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day.date}`)}
                        >
                          <span>{task}</span>
                          <AiOutlineClose
                            className="ml-2 cursor-pointer text-red-500"
                            onClick={() => handleDeleteTask(`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}-${day.date}`, task)}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contain;
