'use client'
import { ScheduleData } from '@/types';
import { processScheduleData } from '@/utils';
import toast from 'react-hot-toast';
import {create} from 'zustand'


interface ITutorScheduleState {
    getScheduleData: () => void;
    scheduleData: ScheduleData | null;
    isLoading: boolean;
  }

 
  export const useTutorScheduleStore = create<ITutorScheduleState>()((set) => ({
    getScheduleData: async () => {
        try {
          set({ isLoading: true})
          const data = await localStorage.getItem('bookings')
          if(!data){
            set({ isLoading: false})
            return
          }
          const parsedData = JSON.parse(data)
          const processData = processScheduleData(parsedData)
          set({scheduleData: processData})
          set({ isLoading: false})
        } catch(error) {
          set({ isLoading: false})
          toast.error('Error when getting the data, please try again')
          return error
        }
    },
    scheduleData: null,
    isLoading: true,
  }));