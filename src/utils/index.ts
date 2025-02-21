'use client'
import { Tutor } from "@/store/tutorListStore";
import { BookingTimes, ScheduleData, TimeSlotData, UserBookings } from "@/types";

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
    const startOfWeek: Date = new Date(today.setDate(today.getDate() - today.getDay() + 1));

    
    for (let i = 0; i < 7; i++) {
        const currentDate: Date = new Date(startOfWeek);
        currentDate.setDate(startOfWeek.getDate() + i);
        const isoDate: string = currentDate.toISOString().split('T')[0];
        
        const dayOfWeek = currentDate.getDay();
        // Exclude saturday (saturday is index 6)
        if (dayOfWeek === 6) { 
            continue;
        }

        bookingTimes[isoDate] = { '25': {}, '50': {} };
        
        for (let hour = 7; hour < 19; hour++) {
            for (const minute of [0, 30]) {
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



const handleTimeSlots = (data: Record<string, Record<string, Record<string, boolean>>>): TimeSlotData => {
  const result: TimeSlotData = {};

  for (const date in data) {
      result[date] = {};

      for (const duration in data[date] as Record<string, unknown>) {
          const timeSlots = Object.keys(data[date][duration] as Record<string, unknown>);
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
    userBookings: UserBookings,
    isDetailPage?: boolean
) {
    const now = new Date(); 
    const availableBookings: Record<string, Record<string, Record<string, boolean>>> = {};

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
                const isOverlapping = Object.keys(userBookings).some(userBooking => {
                    const userBookingTime = new Date(userBooking);
                    const userBookingEndTime = new Date(userBookingTime.getTime() + Number(userBookings[userBooking].duration) * 60000);

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
    return isDetailPage ? availableBookings : filteredTimeBookings;
}

function filterAvailableTimes(bookingTimes: Record<string, Record<string, Record<string, boolean>>>) {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.getTime();

  const filteredTimes: Record<string, Record<string, Record<string, boolean>>> = {};

  Object.entries(bookingTimes).forEach(([date, durations]) => {
      if (date < currentDate) return; // Skip past dates

      filteredTimes[date] = {};

      Object.entries(durations as Record<string, unknown>).forEach(([duration, times]) => {
          const validTimes = Object.keys(times as Record<string, boolean>).reduce((acc: Record<string, boolean>, time) => {
              const slotTime = new Date(time).getTime();
              if (date > currentDate || slotTime >= currentTime) {
                  acc[time] = true;
              }
              return acc;
          }, {});

          if (Object.keys(validTimes).length > 0) {
              (filteredTimes[date] as Record<string, Record<string, boolean>>)[duration] = validTimes;
          }
      });
  });
  const timeSlots = handleTimeSlots(filteredTimes)
  return timeSlots;
}


export const formatTo12HourTime = (isoString: string) => {
    const date = new Date(isoString);
    let hours = date.getHours();
    const minutes = date.getMinutes();
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


export const checkIsOverlapping = (newBooking: UserBookings, currentBookings: UserBookings): boolean => {
    for (const newTime in newBooking) {
        const newDuration = parseInt(newBooking[newTime].duration, 10);
        const newStart = new Date(newTime).getTime();
        // Convert duration to milliseconds
        const newEnd = newStart + newDuration * 60 * 1000; 

        for (const bookedTime in currentBookings) {
            const bookedDuration = parseInt(currentBookings[bookedTime].duration, 10);
            const bookedStart = new Date(bookedTime).getTime();
            const bookedEnd = bookedStart + bookedDuration * 60 * 1000;

            // Check for overlap
            if (newStart < bookedEnd && newEnd > bookedStart) {
                return true;
            }
        }
    }
    return false;
}

export const isTimeBeforeNow = (dateString: string): boolean => {
    if(!dateString) return true
    const givenDate = new Date(dateString);
    const now = new Date();

    return givenDate < now;
}


export const processScheduleData = (data: UserBookings): ScheduleData => {
    const now = new Date();

    const upcoming: UserBookings = {};
    const past: UserBookings = {};
    const earliestBooking: UserBookings = {};

    let earliest: string | null = null;

    for (const [isoDate, booking] of Object.entries(data)) {
        const bookingDate = new Date(isoDate);

        if (bookingDate < now) {
            past[isoDate] = booking;
        } else {
            upcoming[isoDate] = booking;
            if (!earliest || bookingDate < new Date(earliest)) {
                earliest = isoDate;
            }
        }
    }

    // If there's an earliest booking, add it to earliestBooking and remove from upcoming
    if (earliest) {
        earliestBooking[earliest] = data[earliest];
        if(upcoming[earliest]){
            // Remove from upcoming
            delete upcoming[earliest]; 
        }

    }

    // Sort past and upcoming
    const sortedUpcoming = Object.keys(upcoming)
        .sort()
        .reduce((acc: UserBookings, key) => {
            acc[key] = upcoming[key];
            return acc;
        }, {} as UserBookings);

    const sortedPast = Object.keys(past)
        .sort()
        .reduce((acc: UserBookings, key) => {
            acc[key] = past[key];
            return acc;
        }, {} as UserBookings);

    return { upcoming: sortedUpcoming, past: sortedPast, earliest: earliestBooking };
};



export const formatIsoToWeekdayTime = (isoDate: string): string => {
    const date = new Date(isoDate);

    const options: Intl.DateTimeFormatOptions = { weekday: "long"};
    const timeOptions: Intl.DateTimeFormatOptions = { hour: "numeric", minute: "2-digit", hour12: true }
    const weekday = date.toLocaleString("en-US", options);
    const time = date.toLocaleString("en-US", timeOptions);
    return `${weekday} at ${time}`
}


export const checkIsTomorrow = (isoString: string) => {
    const date = new Date(isoString);
    const now = new Date();

    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    return date >= tomorrow && date < new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate() + 1);
}


export const formatDateWithDuration12h = (isoString: string, durationMinutes: number) => {
    const date = new Date(isoString);

    const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
    };
    const formattedDate = date.toLocaleDateString('en-US', options);

    const formatTo12Hour = (date: Date) => {
        let hours = date.getHours();
        const minutes = date.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        return `${hours}:${minutes} ${ampm}`;
    };

    const startTime = formatTo12Hour(date);
    const endTime = formatTo12Hour(new Date(date.getTime() + durationMinutes * 60000));

    return `${formattedDate}, ${startTime} - ${endTime}`;
};