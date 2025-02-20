'use client'
import { useTutorStore } from "@/store/tutorListStore";
import { useEffect, useRef, useState } from "react";


export default function useSearchPage(){
        const [isVisible, setIsVisible] = useState(false);
        const getTutors = useTutorStore((state) => state.getList);
        const tutors = useTutorStore((state) => state.tutors || []);
        const isLoading = useTutorStore((state) => state.isLoading);
        const currentFilters = useTutorStore((state) => state.currentFilters);
        const setFilter = useTutorStore((state) => state.setFilter);
        const currentLanguage = useTutorStore((state) => state.currentLanguage);
        const titleRef = useRef<HTMLDivElement | null>(null);
        const sort = useTutorStore((state) => state.sort);
        const setSort = useTutorStore((state) => state.setSort);
      
        useEffect(() => {
          const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { root: null, threshold: 0 }
          );
      
          if (titleRef.current) {
            observer.observe(titleRef.current);
          }
      
          return () => {
            if (titleRef.current) observer.unobserve(titleRef.current);
          };
        }, []);

        useEffect(() => {
            getTutors();
        },[currentFilters, currentLanguage, sort.field, sort.type])

        return {isVisible, tutors, isLoading, titleRef, currentFilters, setFilter, currentLanguage, sort, setSort}

} 