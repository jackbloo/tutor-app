'use client'
import BottomNavbar from '@/components/BottomNavbar';
import ScheduleEmpty from '@/components/ScheduleEmpty';
import ScheduleItem from '@/components/ScheduleItem';
import ScheduleTomorrowItem from '@/components/ScheduleEarliestItem';
import useSchedulePage from '@/hooks/useSchedulePage';
import Image from 'next/image';
import React from 'react';

const SchedulePage = () => {
   const {handleToHome, isUpcomingEmpty, scheduleData, isPastEmpty, isTomorrowEmpty, isLoading} = useSchedulePage()
   const upcomingData = scheduleData ? scheduleData['upcoming'] : null
   const pastData = scheduleData ? scheduleData['past'] : null
  return (
    <>
    <div className="min-h-screen p-4">
    <div className='flex flex-row justify-between items-center'>
          <div className='font-semibold' style={{fontSize: 24}}>
            Schedule
          </div>
          <div>
              <Image src={`https://ui-avatars.com/api/?name=A+S&background=random&format=webp`} alt="profile-picture" width={30} height={30} className="w-8 h-8 rounded-[5px] object-cover" />
        </div>
          </div>
            {!isTomorrowEmpty && scheduleData && !isLoading && (
              <ScheduleTomorrowItem scheduleData={scheduleData}/>
            )}

        
        {
          !isUpcomingEmpty && upcomingData && !isLoading && (
            <ScheduleItem title='Upcoming' data={upcomingData}/>
          ) 
        }

{
          !isPastEmpty && pastData && !isLoading && (
              <ScheduleItem title='Past' data={pastData}/>
          ) 
        }

      {
        isUpcomingEmpty && isPastEmpty && isTomorrowEmpty && !isLoading && (
            <ScheduleEmpty handleToHome={handleToHome}/>
        )
      }

    </div>
    <BottomNavbar/>
    </>
  );
};



export default SchedulePage;