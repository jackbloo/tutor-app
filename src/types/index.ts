export type BookingTimes = Record<string, { '25': Record<string, unknown>; '50': Record<string, unknown>; }>

export type TimeSlotData = {
  [date: string]: {
      [duration: string]: {
          morning: string[];
          afternoon: string[];
          evening: string[];
      };
  };
};

type Booking = {
    name: string;
    countryOfBirth: string;
    image: string;
    duration: string;
    language: string;
};

export type UserBookings = Record<string, Booking>

export type ScheduleData = {
    upcoming: Record<string, Booking>;
    past: Record<string, Booking>;
    tomorrow: Record<string, Booking>;
};