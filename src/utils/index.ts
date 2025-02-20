'use client'
import { Tutor } from "@/store/tutorListStore";

export const getUniqueNativeLanguages = (database: Tutor[]) => {
    return [...new Set(database.flatMap((tutor) => 
      tutor.languageStacks
        .filter((stack) => stack.level === "Native")
        .map((stack) => stack.language) 
    ))];
  };
  
 export function generateBookingTimes(): Record<string, { '25': Record<string, {}>, '50': Record<string, {}> }> {
      const bookingTimes: Record<string, { '25': Record<string, {}>, '50': Record<string, {}> }> = {};
      const today: Date = new Date();
      const startOfWeek: Date = new Date(today.setDate(today.getDate() - today.getDay()));
      
      let excludedDayIndex: number;
      do {
          excludedDayIndex = Math.floor(Math.random() * 6) + 1;
      } while (excludedDayIndex === 0);
  
      for (let i = 0; i < 7; i++) {
          const currentDate: Date = new Date(startOfWeek);
          currentDate.setDate(startOfWeek.getDate() + i);
          const isoDate: string = currentDate.toISOString().split('T')[0];
          
          if (i === excludedDayIndex) {
              bookingTimes[isoDate] = { '25': {}, '50': {} };
              continue;
          }
          
          bookingTimes[isoDate] = { '25': {}, '50': {} };
          
          for (let hour = 7; hour < 19; hour++) {
              for (let minute of [0, 30]) {
                  const time: Date = new Date(currentDate);
                  time.setHours(hour, minute, 0, 0);
                  bookingTimes[isoDate]['25'][time.toISOString()] = true;
              }
          }
          
          for (let hour = 7; hour < 19; hour++) {
              const time: Date = new Date(currentDate);
              time.setHours(hour, 0, 0, 0);
              bookingTimes[isoDate]['50'][time.toISOString()] = true;
          }
      }
      
      return bookingTimes;
  }
  
  export function findClosestBooking(bookingTimes: Record<string, { '25': Record<string, {}>, '50': Record<string, {}> }>): {
    time: string | null;
    category: string | null;
  } | null {
      const now: Date = new Date();
      let closestTime: string | null = null;
      let minDifference: number = Infinity;
      let closestCategory: string | null = null;
  
      for (const date in bookingTimes) {
          for (const category in bookingTimes[date]) {
              for (const time in bookingTimes[date as string][category as '25' | '50']) {
                  const bookingTime: Date = new Date(time);
                  
                  if (bookingTime > now) { // Ensure the booking time is in the future
                      const difference: number = bookingTime.getTime() - now.getTime();
                      
                      if (difference < minDifference) {
                          minDifference = difference;
                          closestTime = time;
                          closestCategory = category 
                      }
                  }
              }
          }
      }
      
      return {
        time: closestTime,
        category: closestCategory
    };
  }


  export const getUserBookingsData = async () => {
    try {
        const data = await localStorage.getItem('bookings')
        if(!data) return null
        const parsedData = await JSON.parse(data)
        return parsedData
    } catch (error) {
        return null
    }
  }

  export const getUserConfirmationData = async () => {
    try {
        const data = await localStorage.getItem('confirmation')
        if(!data) return null
        const parsedData = await JSON.parse(data)
        await localStorage.removeItem('confirmation')
        return parsedData
    } catch (error) {
        return null
    }
  }
  
  export const formatDateWithDuration = (isoString: string, durationMinutes: number) => {
    const date = new Date(isoString);
    
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = date.toLocaleDateString('en-US', options);
    

    const startHours = date.getHours().toString().padStart(2, '0');
    const startMinutes = date.getMinutes().toString().padStart(2, '0');
    const startTime = `${startHours}:${startMinutes}`;
    

    const endDate = new Date(date.getTime() + durationMinutes * 60000);
    const endHours = endDate.getHours().toString().padStart(2, '0');
    const endMinutes = endDate.getMinutes().toString().padStart(2, '0');
    const endTime = `${endHours}:${endMinutes}`;

    return `${formattedDate}, ${startTime}-${endTime}`;
}

