'use client'
import BottomNavbar from '@/components/BottomNavbar';
import useSchedulePage from '@/hooks/useSchedulePage';
import { ScheduleData } from '@/types';
import { formatDateWithDuration, formatIsoToWeekdayTime, getWeekdayAndDate } from '@/utils';
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
              <div className='mt-4'>
                {Object.keys(scheduleData['tomorrow'])?.map((data) => {
                    const currentData = scheduleData['tomorrow'][data as keyof ScheduleData]
                    const name = currentData?.name
                    const image = currentData?.image
                    const language = currentData?.language
                    const duration = currentData?.duration
                  return (
                    <div className='p-4 rounded-lg flex flex-row gap-4' style={{border: '2px solid #dedde5'}} key={data}>
                  <div className='flex flex-col gap-1' style={{width: '70%'}}>
                    <div className='text-xs font-medium' style={{color: '#48474e'}}>Tomorrow</div>
                    <div className='font-bold' style={{fontSize: 24}}>
                      {`${language} with ${name}`}
                    </div>
                    <div className='text-xs' style={{color: '#4f4d59'}}>
                      {formatDateWithDuration(data || '', Number(duration), true)}
                    </div>
                  </div>
                  <div className='flex flex-1 justify-end'>
                    <div>
                    <Image src={`${image}&format=webp`} alt="profile-picture" width={45} height={45} className="rounded-[5px] object-cover" />
                    </div>
                  </div>
                </div>
                  )
                })}
                </div>
            )}

        
        {
          !isUpcomingEmpty && upcomingData && !isLoading && (
            <div className='mt-2'>
            <div className='font-semibold'>
              Upcoming
            </div>
            <div className='mt-2 flex flex-col gap-2' style={{marginBottom: 40}}>
            {Object.keys(upcomingData || {})?.map((el) => {
              if(!upcomingData?.[el]) return null
              const formattedDate = getWeekdayAndDate(el)
              const name = upcomingData[el]?.name
              const image = upcomingData[el]?.image
              const language = upcomingData[el]?.language
              return (
                <div className='p-4 rounded-lg flex flex-row gap-4' style={{border: '2px solid #dedde5'}} key={el}>
                  <div className='flex flex-col justify-center font-medium' style={{minWidth: 30}}>
                    <div className='text-sm' style={{textAlign: 'center'}}>
                      {formattedDate.weekday}
                    </div>
                    <div className='text-sm' style={{textAlign: 'center'}}>
                      {formattedDate.date}
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-between flex-1'>
                    <div className='flex flex-col' style={{gap: 4}}>
                    <div className='font-bold text-sm'>
                      {formatIsoToWeekdayTime(el)}
                    </div>
                    <div className='text-xs' style={{color: '#4c4e54'}}>
                      {`${name}, ${language}`}
                    </div>
                    </div>
    
                    <div>
                  <Image src={`${image}&format=webp`} alt="profile-picture" width={30} height={30} className="w-8 h-8 rounded-[5px] object-cover" />
                  </div>
                  </div>
            </div>
              )
            })}
            </div>
      
          </div>
          ) 
        }

{
          !isPastEmpty && pastData && !isLoading && (
            <div className='mt-2'>
            <div className='font-semibold'>
              Past
            </div>
            <div className='mt-2 flex flex-col gap-2' style={{marginBottom: 40}}>
            {Object.keys(pastData || {})?.map((el) => {
              if(!pastData?.[el]) return null
              const formattedDate = getWeekdayAndDate(el)
              const name = pastData[el]?.name
              const image = pastData[el]?.image
              const language = pastData[el]?.language
              return (
                <div className='p-4 rounded-lg flex flex-row gap-4' style={{border: '2px solid #dedde5'}} key={el}>
                  <div className='flex flex-col justify-center font-medium' style={{minWidth: 30}}>
                    <div className='text-sm' style={{textAlign: 'center'}}>
                      {formattedDate.weekday}
                    </div>
                    <div className='text-sm' style={{textAlign: 'center'}}>
                      {formattedDate.date}
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-between flex-1'>
                    <div className='flex flex-col' style={{gap: 4}}>
                    <div className='font-bold text-sm'>
                      {formatIsoToWeekdayTime(el)}
                    </div>
                    <div className='text-xs' style={{color: '#4c4e54'}}>
                      {`${name}, ${language}`}
                    </div>
                    </div>
    
                    <div>
                  <Image src={`${image}&format=webp`} alt="profile-picture" width={30} height={30} className="w-8 h-8 rounded-[5px] object-cover" />
                  </div>
                  </div>
            </div>
              )
            })}
            </div>
      
          </div>
          ) 
        }

      {
        isUpcomingEmpty && isPastEmpty && !isLoading && (
          <div style={{marginTop: 64}}>
            <div className='font-semibold' style={{fontSize: 24}}>
              {"You'll see your tutors and lesson schedule here"}
            </div>
            <div className='mt-4 text-sm'>
              {"Your lesson schedule is the path to success. Find a tutor and book your first lesson to start"}
            </div>
            <div className='mt-4'>
            <button className=" font-semibold px-6 py-2 rounded-lg w-full" style={{border: '2px solid black', background: '#ff7aac'}} onClick={handleToHome}>Find a tutor</button>
            </div>
          </div>
        )
      }

  
    </div>
    <BottomNavbar/>
    </>
  );
};



export default SchedulePage;