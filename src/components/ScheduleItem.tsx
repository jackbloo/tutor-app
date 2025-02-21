'use client'
import { UserBookings } from "@/types"
import { formatIsoToWeekdayTime, getWeekdayAndDate } from "@/utils"
import Image from "next/image"
import { MdVerified } from "react-icons/md";


type ScheduleItemProps = {
    title: 'Upcoming' | 'Past',
    data: UserBookings
}

const ScheduleItem = ({
    title,
    data
}: ScheduleItemProps) => {
    const isPast = title === 'Past'
        return (
            <div className='mt-2'>
            <div className='font-semibold'>
              {title}
            </div>
            <div className='mt-2 flex flex-col gap-2' style={{marginBottom: 40}}>
            {Object.keys(data || {})?.map((el) => {
              if(!data?.[el]) return null
              const formattedDate = getWeekdayAndDate(el)
              const name = data[el]?.name
              const image = data[el]?.image
              const language = data[el]?.language
              return (
                <div className='p-4 rounded-lg flex flex-row gap-4' style={{border: '2px solid #dedde5'}} key={el}>
                  <div className='flex flex-col justify-center font-medium' style={{minWidth: 30}}>
                    <div className='text-sm' style={{textAlign: 'center', color: isPast ?'#6e6e7c' : 'black'}}>
                      {formattedDate.weekday}
                    </div>
                    <div className='text-sm' style={{textAlign: 'center', color: isPast ?'#6e6e7c' : 'black'}}>
                      {formattedDate.date}
                    </div>
                  </div>
                  <div className='flex flex-row items-center justify-between flex-1'>
                    <div className='flex flex-col' style={{gap: 4}}>
                    <div className='text-sm font-semibold' style={{color: isPast ? '#69657b' : 'black'}}>
                      {formatIsoToWeekdayTime(el)}
                    </div>
                    <div className='text-xs' style={{color: '#4c4e54'}}>
                      {`${name}, ${language}`}
                    </div>
                    </div>
    
                    <div>
                        {isPast ? 
                        <MdVerified color="grey" size={20}/>
                        : (
                  <Image src={`${image}&format=webp`} alt="profile-picture" width={30} height={30} className="w-8 h-8 rounded-[5px] object-cover" />
                        )}

                  </div>
                  </div>
            </div>
              )
            })}
            </div>
      
          </div>
        )    
}

export default ScheduleItem