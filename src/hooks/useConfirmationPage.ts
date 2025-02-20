'use client'

import { Tutor } from "@/store/tutorListStore"
import { getUserConfirmationData } from "@/utils"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"





export default function useConfirmationPage(){
    const {push} = useRouter()
    const [data, setData] = useState<Pick<Tutor, 'countryOfBirth' | 'name' | 'image'> & {time: string; duration: string;} | null>(null)
    useEffect(() => {   
     const fetchData = async() => {
        const confirmationData = await getUserConfirmationData()
        if(!confirmationData) return push('/')
       setData(confirmationData)
     }
     fetchData()
    }, [])
    const handleToSchedule = () => push('/schedule')
    return { data, handleToSchedule }
} 