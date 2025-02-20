'use client'
import { useEffect } from "react";
import { useParams, useRouter }  from "next/navigation";
import { useTutorDetailStore } from "@/store/tutorDetailPage";


export default function useDetailPage(){
    const {id} = useParams()
    const {push} = useRouter()
    const getDetail = useTutorDetailStore((store) => store.getDetail)
    const tutorDetail = useTutorDetailStore((store) => store.tutorDetail)
    const backToHome = () => {
        push('/')
    }
    useEffect(() => {
        getDetail(Number(id))
    },[])

    return { tutorDetail, backToHome}

} 