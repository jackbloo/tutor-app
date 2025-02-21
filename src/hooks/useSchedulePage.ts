'use client'

import { useTutorScheduleStore } from "@/store/tutorScheduleStore"
import { useRouter } from "next/navigation"
import { useEffect } from "react"



export default function useSchedulePage(){
    const {push} = useRouter()
    const handleToHome = () => push('/')
    const getScheduleData = useTutorScheduleStore((store) => store.getScheduleData)
    const scheduleData = useTutorScheduleStore((store) => store.scheduleData)
    const isLoading = useTutorScheduleStore((store) => store.isLoading)

    const isTomorrowEmpty = !scheduleData || Boolean(scheduleData && Object.keys(scheduleData['earliest'])?.length < 1)
    const isPastEmpty =  !scheduleData || Boolean(scheduleData && Object.keys(scheduleData['past'])?.length < 1)
    const isUpcomingEmpty =  !scheduleData || Boolean(scheduleData && Object.keys(scheduleData['upcoming'])?.length < 1)
    useEffect(() => {
      getScheduleData()
    },[])

    return {  handleToHome, scheduleData, isTomorrowEmpty, isPastEmpty, isUpcomingEmpty, isLoading }
} 