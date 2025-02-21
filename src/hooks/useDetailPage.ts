'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter }  from "next/navigation";
import { useTutorDetailStore } from "@/store/tutorDetailStore";
import { filterAvailableBookings, findClosestBooking, generateBookingTimes } from "@/utils";
import { TimeSlotData, UserBookings } from "@/types";
import toast from "react-hot-toast";


export default function useDetailPage(){
    const {id} = useParams()
    const {push} = useRouter()
    const [isBookModalOpen, setIsBookModalOpen] = useState(false)
    const getDetail = useTutorDetailStore((store) => store.getDetail)
    const tutorDetail = useTutorDetailStore((store) => store.tutorDetail)
    const backToHome = () => {
        push('/')
    }
    useEffect(() => {
        getDetail(Number(id))
    },[])

    const handleBookRightNow = async () => {
        try {
        const bookingTimes = generateBookingTimes()
        const data = await localStorage.getItem('bookings')
        const currentBookingTime = JSON.parse(data || '{}')
        const availableBookings: Record<string, Record<string, Record<string, boolean>>> | TimeSlotData = filterAvailableBookings(bookingTimes, currentBookingTime, true)
        const closestTime = findClosestBooking(availableBookings as Record<string, { '25': Record<string, unknown>; '50': Record<string, unknown>; }> )
        if(!closestTime?.time || !closestTime?.category || !tutorDetail) return toast.error('No tutor data is found')
        let latestData: UserBookings = {};
        const userNative = tutorDetail?.languageStacks?.find((el) => el.level === 'Native')?.language || ''
        const userData = {
            name: tutorDetail?.name,
            countryOfBirth: tutorDetail?.countryOfBirth,
            image: tutorDetail?.image,
            duration: closestTime?.category,
            language: userNative
        }
        if(!data){
            if(!latestData[closestTime?.time as string]){
                latestData[closestTime?.time] = userData
            }
        }else{
            latestData = {
                ...currentBookingTime,
                [closestTime?.time] : {
                   ...userData
                }
            }
        }
        const confirmationData = JSON.stringify({
            ...latestData[closestTime?.time],
            time: closestTime?.time
        })
        const stringifiedData = JSON.stringify(latestData || {})
        await localStorage.setItem('bookings', stringifiedData)
        await localStorage.setItem('confirmation', confirmationData)
        push('/confirmation')
        } catch(error) {
        toast.error('Error when trying to submit the data, please try again')
        return
        }


    }

    const handleBookingLater = () => {
        push(`/booking/${tutorDetail?.id}`)
    }

    return { tutorDetail, backToHome, isBookModalOpen, setIsBookModalOpen, handleBookRightNow, handleBookingLater}

} 