'use client'
import { ScheduleData } from "@/types"
import { formatDateWithDuration } from "@/utils"
import Image from "next/image"

type ScheduleTomorrowItemProps =  {
    scheduleData: ScheduleData
}

const ScheduleTomorrowItem =({
    scheduleData
}: ScheduleTomorrowItemProps) => {
    return(
        <div className='mt-4'>
        {Object.keys(scheduleData)?.map((data) => {
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
    )
}

export default ScheduleTomorrowItem