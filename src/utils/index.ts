'use client'
import { Tutor } from "@/store/tutorListStore";
import { BookingTimes, TimeSlotData, UserBookings } from "@/types";

export const getUniqueNativeLanguages = (database: Tutor[]) => {
    return [...new Set(database.flatMap((tutor) => 
      tutor.languageStacks
        .filter((stack) => stack.level === "Native")
        .map((stack) => stack.language) 
    ))];
  };
  
  export const generateBookingTimes = (): Record<string, { '25': Record<string, unknown>, '50': Record<string, unknown> }> => {
    const bookingTimes: Record<string, { '25': Record<string, unknown>, '50': Record<string, unknown> }> = {};
    const today: Date = new Date();
    const startOfWeek: Date = new Date(today.setDate(today.getDate() - today.getDay()));

    for (let i = 0; i < 7; i++) {
        const currentDate: Date = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        const isoDate: string = currentDate.toISOString().split('T')[0];
        
        const dayOfWeek = currentDate.getDay();
        // Exclude weekends (Sunday = 0, Saturday = 6)
        if (dayOfWeek === 0 || dayOfWeek === 6) { 
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

  
  export const findClosestBooking = (bookingTimes: Record<string, { '25': Record<string,unknown>, '50': Record<string, unknown> }>): {
    time: string | null;
    category: string | null;
  } | null => {
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
    } catch {
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
    } catch {
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



const handleTimeSlots = (data: any): TimeSlotData => {
  const result: TimeSlotData = {};

  for (const date in data) {
      result[date] = {};

      for (const duration in data[date]) {
          const timeSlots = Object.keys(data[date][duration]);
          const categorized = {
              morning: [] as string[],
              afternoon: [] as string[],
              evening: [] as string[],
          };

          timeSlots.forEach((time) => {
              const hour = new Date(time).getHours();
              if (hour >= 5 && hour < 12) {
                  categorized.morning.push(time);
              } else if (hour >= 12 && hour < 17) {
                  categorized.afternoon.push(time);
              } else {
                  categorized.evening.push(time);
              }
          });

          result[date][duration] = categorized;
      }
  }
  return result;
};


export function filterAvailableBookings(
    bookingTimes: BookingTimes,
    userBookings: UserBookings
) {
    const now = new Date(); 
    const availableBookings: Record<string, { '25': Record<string, unknown>; '50': Record<string, unknown>; }> = {} as Record<string, { '25': Record<string, unknown>; '50': Record<string, unknown>; }>;

    for (const date in bookingTimes) {
        const parsedDate = new Date(date);

        // Skip past dates
        if (parsedDate < new Date(now.setHours(0, 0, 0, 0))) continue;

        availableBookings[date] = { '25': {}, '50': {} };

        for (const duration in bookingTimes[date]) {
            availableBookings[date][duration as '25' | '50'] = {};

            for (const time in bookingTimes[date][duration as '25' | '50']) {
                const bookingTime = new Date(time);

                // Skip past times
                if (bookingTime < now) continue;

                // Check if the current time is already booked
                const isOverlapping = Object.values(userBookings).some(userBooking => {
                    const userBookingTime = new Date(userBooking as any);
                    const userBookingEndTime = new Date(userBookingTime.getTime() + userBooking.duration * 60000);

                    return bookingTime >= userBookingTime && bookingTime < userBookingEndTime;
                });

                if (!isOverlapping) {
                    availableBookings[date][duration as '25' | '50'][time] = true;
                }
            }

            // Remove empty durations
            if (Object.keys(availableBookings[date][duration as '25' | '50']).length === 0) {
                delete availableBookings[date][duration as '25' | '50'];
            }
        }

        // Remove empty dates
        if (Object.keys(availableBookings[date]).length === 0) {
            delete availableBookings[date];
        }
    }
    const filteredTimeBookings = filterAvailableTimes(availableBookings)
    return filteredTimeBookings;
}

function filterAvailableTimes(bookingTimes: Record<string, any>) {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.getTime();

  const filteredTimes: Record<string, any> = {};

  Object.entries(bookingTimes).forEach(([date, durations]) => {
      if (date < currentDate) return; // Skip past dates

      filteredTimes[date] = {};

      Object.entries(durations).forEach(([duration, times]) => {
          const validTimes = Object.keys(times as any).reduce((acc: Record<string, boolean>, time) => {
              const slotTime = new Date(time).getTime();
              if (date > currentDate || slotTime >= currentTime) {
                  acc[time] = true;
              }
              return acc;
          }, {});

          if (Object.keys(validTimes).length > 0) {
              filteredTimes[date][duration] = validTimes;
          }
      });
  });
  const timeSlots = handleTimeSlots(filteredTimes)
  return timeSlots;
}


export const formatTo12HourTime = (isoString: string) => {
    const date = new Date(isoString);
    let hours = date.getUTCHours();
    const minutes = date.getUTCMinutes();
    const amPm = hours >= 12 ? "PM" : "AM";
    // Convert 0 to 12 for AM/PM format
    hours = hours % 12 || 12; 
    const formattedMinutes = minutes.toString().padStart(2, "0");

    return `${hours}:${formattedMinutes} ${amPm}`;
}


export const formatToMonthYear = (isoString: string) => {
    const date = new Date(isoString);
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "long" };
    return date.toLocaleDateString("en-US", options);
}

export const checkIsToday = (isoString: string) =>  {
    const givenDate = new Date(isoString);
    const today = new Date();

    return (
        givenDate.getUTCFullYear() === today.getUTCFullYear() &&
        givenDate.getUTCMonth() === today.getUTCMonth() &&
        givenDate.getUTCDate() === today.getUTCDate()
    );
}

export const checkSimilarDate = (firstDate: string, secondDate: string) =>  {
    const givenDate = new Date(firstDate);
    const otherDate = new Date(secondDate);

    return (
        givenDate.getUTCFullYear() === otherDate.getUTCFullYear() &&
        givenDate.getUTCMonth() === otherDate.getUTCMonth() &&
        givenDate.getUTCDate() === otherDate.getUTCDate()
    );
}

export const  getCurrentWeek =() => {
    const today = new Date();
    const dayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Calculate the difference to Monday
    const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;

    // Get Monday's date
    const monday = new Date(today);
    monday.setDate(today.getDate() + diffToMonday);

    // Generate the full week (Monday to Sunday)
    const week = [];
    for (let i = 0; i < 7; i++) {
        const date = new Date(monday);
        date.setDate(monday.getDate() + i);
        week.push(date.toISOString().split("T")[0]);
    }

    return week;
}


export const getWeekdayAndDate = (isoString:string) => {
    const date = new Date(isoString);
    
    // Get full weekday name
    const optionsWeekday: Intl.DateTimeFormatOptions  = { weekday: 'short' };
    // Get formatted date
    const optionsDate: Intl.DateTimeFormatOptions = { day: 'numeric' }; 
    
    const weekday = date.toLocaleDateString('en-US', optionsWeekday);
    const formattedDate = date.toLocaleDateString('en-US', optionsDate); 
    
    return { weekday, date: formattedDate };
}


export const checkIsBeforeToday = (isoString: string) => {
    const inputDate = new Date(isoString);
    const today = new Date();

    // Set time to midnight to only compare dates
    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    return inputDate < today;
}


export const capitalizeFirstLetter =(str: string)=> {
    if (!str) return str; 
    return str.charAt(0).toUpperCase() + str.slice(1);
}