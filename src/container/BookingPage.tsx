'use client'
import useBookingPage from "@/hooks/useBookingPage";
import { formatTo12HourTime, formatToMonthYear, checkIsToday, getCurrentWeek, getWeekdayAndDate, checkSimilarDate, checkIsBeforeToday, capitalizeFirstLetter } from "@/utils";
import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { TbSunset2 } from "react-icons/tb";
import { LuSun } from "react-icons/lu";
import { WiSunrise } from "react-icons/wi";
import Image from "next/image";

const renderIcon = (time: string) => {
    switch(time){
        case 'morning':
            return <WiSunrise size={20} />
        case 'afternoon':
            return <LuSun size={20} />
        case 'evening':
            return <TbSunset2 size={20} />
        default:
            return <TbSunset2 size={20} />
    }
}

const BookingPage = () => {
    const {setCurrentDuration, currentDuration, currentDate, setCurrentDate, currentData, isLoading, chosenDate, setChosenDate, handleBookTutor, handleToBack} = useBookingPage()
    const isToday = checkIsToday(currentDate)
    const currentWeek = getCurrentWeek()
  return (
    <>
    <div className="bg-white w-full p-4 rounded-xl">
      <header className="flex items-center mb-4" style={{gap: 50}}>
        <div onClick={handleToBack}>
                <IoArrowBackOutline/>
        </div>
        <div className="flex flex-col justify-center items-center">
        <span className="font-bold">{currentDuration} min lesson</span>
        <p className="text-gray-600 mb-1" style={{fontSize: 10}}>
          To discuss your level and learning plan
        </p>
        </div>
      </header>
    
        <div className="flex w-full flex-1 mt-4 rounded-lg" style={{background: '#dedde5'}}>
          
          <button className="text-xs font-semibold w-1/2 flex-1 rounded-lg" style={{background: currentDuration === '25' ?  'white': '#dedde5', ...(currentDuration === '25' ? {border: '2px solid #dedde5', padding: '4px 4px',} : {})}} onClick={() => {
            setCurrentDuration('25')
            setChosenDate(null)
            }}>
            25 min
          </button>
          <button className="text-xs font-semibold flex-1 rounded-lg" style={{ background: currentDuration === '50' ?  'white': '#dedde5', ...(currentDuration === '50' ? {border: '2px solid #dedde5', padding: '4px 4px',} : {})}} onClick={() => {
            setCurrentDuration('50')
            setChosenDate(null)
            }}>
            50 min
          </button>
        </div>
      <section className="mt-4">
        <div className="flex flex-row justify-between mb-2 items-center">
        <p className="text-sm mb-1 font-semibold">{formatToMonthYear(currentDate)}</p>
        {isToday &&  <div className="text-xs mt-2 font-semibold" style={{textDecoration: 'underline'}}>Today</div>}
        </div>

        <div className="flex justify-between mb-2 mt-2">
            {currentWeek.map((week) => {
                const formattedWeek = getWeekdayAndDate(week)
                const isActive = checkSimilarDate(week, currentDate)
                const isBeforeToday = checkIsBeforeToday(week)
                return (
                    <div className="flex flex-col items-center gap-4" onClick={() => isBeforeToday ? null : setCurrentDate(week)} key={week}>
                    <span className="text-xs ">{formattedWeek.weekday}</span>
                    <div className="flex items-center justify-center" style={{...(isActive ? {background: '#ff7aac', borderRadius: '50%', width: 30, height:30, marginTop: -7} : {})}}>
                    <span className="text-xs font-semibold" style={{...(isBeforeToday ? {color: 'grey'}: {})}}>{formattedWeek.date}</span>
                    </div>
                    </div>
                )
            })}

        </div>

      </section>
      <section className="mb-4 mt-4" style={{marginBottom: 100}}>
        
        <p className="text-gray-600 mb-1" style={{fontSize: 11}}>
          In your time zone, Asia/Singapore (GMT +8:00)
        </p>
        <div className="mb-4 mt-4">
            {!currentData && !isLoading && (
                <div className="flex items-center justify-center">
                    <Image src="/empty_data.webp" alt="empty" height={400} width={400}/>
                </div>
            )}
            {currentData && !isLoading && Object.keys(currentData || {}).map((time) => {
                if(!currentData || currentData[time]?.length < 1) return null
                return(
                    <div className="mt-2" key={time}>
                        <div className="flex flex-row gap-2 items-center">
                            {renderIcon(time)}
                            <p className="text-sm font-semibold">{capitalizeFirstLetter(time)}</p>
                        </div>
                    <div className="mt-4 flex flex-col gap-2">
                      { currentData[time]?.map((actual: string) => {
                        const formattedTime = formatTo12HourTime(actual)
                        return <button key={actual} className="w-full rounded-lg text-sm font-semibold" style={{border: `2px solid ${actual === chosenDate ? '#ff7aac':'#dedde5'}`, padding: '8px'}} onClick={() => setChosenDate(actual)}>
                        {formattedTime}
                      </button>
                      })}

                    </div>
                    </div>
                )
            })}

        </div>
      </section>
    </div>
            {/* Book Button */}
            <div className="fixed bottom-0 mt-6 flex space-x-4 p-4 w-full bg-white" style={{boxShadow: '0 -10px 20px -10px rgba(0, 0, 0, 0.1)'}}>
            <button className=" font-semibold px-6 py-2 rounded-lg w-full" style={{border: '2px solid black', background: chosenDate ? '#ff7aac' : 'grey'}} disabled={Boolean(!chosenDate)} onClick={handleBookTutor}>Book tutor</button>
          </div>
          </>
  );
};
export default BookingPage;
