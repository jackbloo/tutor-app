'use client'
import { UserBookings } from '@/types';
import { filterAvailableBookings, generateBookingTimes } from '@/utils';
import {create} from 'zustand'


interface ITutorBookingState {
    getBookingData: (date:string, duration: string) => void;
    currentData: any | null;
  }

 
  export const useTutorBookingStore = create<ITutorBookingState>()((set) => ({
    getBookingData: async (date: string, duration: string) => {
        try {
          let currentBookingTime:UserBookings ={}
            const bookingTimes = await generateBookingTimes()
            const currentBookings = await localStorage.getItem('bookings')
            if(currentBookings){
              currentBookingTime = JSON.parse(currentBookings)
            }
          const availableBookings = filterAvailableBookings(bookingTimes, currentBookingTime)
          const today = new Date().toISOString().split('T')[0]
          set({
            currentData: availableBookings[date || today][duration || '25'] || null
          })
        } catch {
          
        }
    },
    currentData: null
  }));