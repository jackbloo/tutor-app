'use client'
import { useEffect, useState } from "react";
import { useParams, useRouter }  from "next/navigation";
import { useTutorDetailStore } from "@/store/tutorDetailStore";
import { findClosestBooking, generateBookingTimes } from "@/utils";


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
        const closestTime = findClosestBooking(bookingTimes)
        if(!closestTime?.time || !closestTime?.category) return
        const data = await localStorage.getItem('booking')
        let latestData: { [key: string]: {
            name?:string;
            countryOfBirth?: string;
            image?: string;
            duration?: string;
        } } = {}
        if(!data){
            if(!latestData[closestTime?.time as string]){
                latestData[closestTime?.time] = {}
            }
            latestData[closestTime?.time] = {
                name: tutorDetail?.name,
                countryOfBirth: tutorDetail?.countryOfBirth,
                image: tutorDetail?.image,
                duration: closestTime?.category
            }
        }else{
            const response = JSON.parse(data || '{}')
            if(!latestData[closestTime?.time as string]){
                latestData[closestTime?.time] = {}
            }
            latestData = {
                ...response,
                [closestTime?.time] : {
                    name: tutorDetail?.name,
                    countryOfBirth: tutorDetail?.countryOfBirth,
                    image: tutorDetail?.image,
                    duration: closestTime?.category
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
        } catch {
        return
        }


    }

    return { tutorDetail, backToHome, isBookModalOpen, setIsBookModalOpen, handleBookRightNow}

} 