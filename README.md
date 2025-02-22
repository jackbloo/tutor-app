# Tutor App
Book your class in tutor app now!

## Tech Stack
Nextjs, Tailwind css

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Notes
### Search Page
- Filter:
    - Price: All tutors that have under $40
    - Native: All tutors that are native
    - Super Tutor: All tutors that are super tutor
- Sort:
    - Popularity: Sort by the students
    - Price: Sort by tutor price
    - Reviews: Sort by tutor reviews
    - Rating: Sort by tutor rating
    - To test asc or dsc, clicking the icon will trigger change
- Language:
    - Will filter tutor if the type changes from All to a specific language

### Detail Page
- Book Tutor:
    - Instant: Will book the earliest schedule
    - Later: Will redirect to booking page
- Buttons:
    - Some buttons will not be clickable only book tutor is clickable

### Booking Page
- Schedule: 
    - Assumption: Every Saturday there wont be any schedules to test the empty schedule
- Book Tutor:
    - Color will change to pink or enabled after user chose one schedule
    - Will check first if there are overlapping booking schedules, will show error if its overlapping

### Confirmation Page
- Redirect:
    - Will just show confirmation and if button clicked will move to the schedule page

### Schedule Page
- Empty:
    - When empty there will be text and button shown
- Earliest:
    - When there is earliest data, it will show and excluded from upcoming
- Upcoming & Past:
    - Upcoming and past will have the same component but different sections






