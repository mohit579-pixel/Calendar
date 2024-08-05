import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiCalendar } from 'react-icons/ci';
import Contain from './Contain';
import { setSelectedDate } from '../features/calendar/calendarSlice';

export const Options = () => {
    const dispatch = useDispatch();
    const [showContain, setShowContain] = React.useState(false);
    const selectedDate = useSelector(state => state.calendar.selectedDate);

    const handleIconClick = () => {
        setShowContain(!showContain);
    };

    return (
        <>
            <div className='bg-blue-500 w-full p-4 flex items-center gap-6'>
                <div className='text-white font-bold text-lg'>Options</div>
                
                {selectedDate && (
                    <div className='text-white'>
                        Selected Date: {selectedDate.toDateString()}
                    </div>
                )}
            </div>
             <Contain />



        </>
    );
};
