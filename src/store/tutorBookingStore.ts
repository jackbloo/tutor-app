'use client'
import { database } from '@/data';
import { UserBookings } from '@/types';
import { filterAvailableBookings, generateBookingTimes } from '@/utils';
import {create} from 'zustand'
import { Tutor } from './tutorListStore';
import toast from 'react-hot-toast';


interface ITutorBookingState {
    getBookingData: (date:string, duration: string, id:string) => void;
    currentData: Record<string, Record<string, Record<string, boolean>>> | null;
    isLoading: boolean;
    tutorData: Tutor | null;
  }

 
  export const useTutorBookingStore = create<ITutorBookingState>()((set) => ({
    getBookingData: async (date: string, duration: string, id: string) => {
        try {
          set({ isLoading: true})
          let currentBookingTime:UserBookings ={}
            const bookingTimes = await generateBookingTimes()
            const currentBookings = await localStorage.getItem('bookings')
            if(currentBookings){
              currentBookingTime = JSON.parse(currentBookings)
            }
          const availableBookings = filterAvailableBookings(bookingTimes, currentBookingTime)
          const today = new Date().toISOString().split('T')[0]

          if(availableBookings && availableBookings[date || today] && availableBookings[date || today][duration || '25']){
            set({
              currentData: availableBookings[date || today][duration || '25'] as unknown as Record<string, Record<string, Record<string, boolean>>>
            })
          }else{
            set({
              currentData: null
            })
          }
          const currentTutor = database.find((tutor) => String(tutor.id) === String(id))
          set({tutorData: currentTutor})
          set({ isLoading: false})
        } catch(error) {
          set({ isLoading: false})
          toast.error('Error when getting the data, please try again')
          return error
        }
    },
    currentData: null,
    isLoading: true,
    tutorData: null
  }));