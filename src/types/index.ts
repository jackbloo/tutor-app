export type BookingTimes = Record<string, { '25': Record<string, unknown>; '50': Record<string, unknown>; }>

export type UserBookings = {
    [time: string]: {
        name: string;
        countryOfBirth: string;
        image: string;
        duration: number;
    };
};

export type TimeSlotData = {
  [date: string]: {
      [duration: string]: {
          morning: string[];
          afternoon: string[];
          evening: string[];
      };
  };
};