'use client'

import { useTutorBookingStore } from "@/store/tutorBookingStore"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"





export default function useBookingPage(){
    const {back} = useRouter()
    const getBookingData = useTutorBookingStore((store) => store.getBookingData)
    const currentData = useTutorBookingStore((store) => store.currentData)
    const [currentDuration, setCurrentDuration] = useState('25')
    const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0])
    useEffect(() => {
        console.log(currentDate)
        console.log(currentDuration)
        getBookingData(currentDate, currentDuration)
    },[currentDuration, currentDate])
    const handleToBack= () => back()

    return {  handleToBack, currentDuration, setCurrentDuration,  currentDate, setCurrentDate, currentData}
} 