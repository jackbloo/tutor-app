'use client'

import { useTutorBookingStore } from "@/store/tutorBookingStore"
import { UserBookings } from "@/types"
import { checkIsOverlapping, isTimeBeforeNow } from "@/utils"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"





export default function useBookingPage(){
    const {back, push} = useRouter()
    const {id} = useParams()
    const getBookingData = useTutorBookingStore((store) => store.getBookingData)
    const currentData = useTutorBookingStore((store) => store.currentData)
    const isLoading = useTutorBookingStore((store) => store.isLoading)
    const tutorData = useTutorBookingStore((store) => store.tutorData)

    const [currentDuration, setCurrentDuration] = useState('25')
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    const [chosenDate, setChosenDate] = useState<string | null>(null)
    useEffect(() => {
        getBookingData(currentDate, currentDuration, id as string)
    },[currentDuration, currentDate])

    const handleToBack= () => back()

    const handleBookTutor = async () => {
        try {
        if(!chosenDate || isTimeBeforeNow(chosenDate)) return toast.error('Please kindly choose one date to book')

        const data = await localStorage.getItem('bookings')
        let latestData: UserBookings = {}
        const userNative = tutorData?.languageStacks?.find((el) => el.level === 'Native')?.language || ''
        const userData = {
            name: tutorData?.name || '',
            countryOfBirth: tutorData?.countryOfBirth || '',
            image: tutorData?.image || '',
            duration: currentDuration,
            language: userNative
        }
        if(!data){
            latestData[chosenDate] = {
                    ...userData
            }
        }else{
            const response = JSON.parse(data || '{}')
            const isOverlapping = checkIsOverlapping(response, {
                                [chosenDate] : {
                                    ...userData
                                }
                            })

            if(isOverlapping){
                return toast.error('The time chosen is overlapping with the existing schedule, Please kindly choose another schedule')
            }
            latestData = {
                ...response,
                [chosenDate] : userData
            }
        }
        const confirmationData = JSON.stringify({
            ...latestData[chosenDate],
            time: chosenDate
        })
        const stringifiedData = JSON.stringify(latestData || {})
        await localStorage.setItem('bookings', stringifiedData)
        await localStorage.setItem('confirmation', confirmationData)
        push('/confirmation')
        } catch {
        return toast.error('Error when trying to submit the data, please try again')
        }

    
        }

    return {  handleToBack, currentDuration, setCurrentDuration,  currentDate, setCurrentDate, currentData, setChosenDate, chosenDate, isLoading, handleBookTutor}
} 