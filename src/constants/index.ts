

export const menuBar = [
{
    id: 'search',
    route: '/',
    label: 'Search',
},
{
    id: 'messages',
    route: '/messages',
    label: 'Messages',
},
{
    id: 'schedule',
    route: '/schedule',
    label: 'Schedule',
},
{
    id: 'vocab',
    route: '/vocab',
    label: 'Vocab',
},
]

export const filters = [{
    id: 'price',
    label: 'Price',
},
{
    id: 'isSuperTutor',
    label: 'Super Tutor',
},
{
    id: 'native',
    label: 'Native',
}]

export const sortOptions = [{
    id: 'price',
    label: 'Price',
},
{
    id: 'rating',
    label: 'Rating',
},
{
    id: 'reviews',
    label: 'Reviews',
},
{
    id: 'popularity',
    label: 'Popularity',
}]

export const flagMap: {[key: string]: string} = {
    "French": "fr",
    "Spanish": "es",
    "German": "de",
    "Italian": "it",
    "Japanese": "jp",
    "Mandarin": "cn",
    "Russian": "ru",
    "Portuguese": "br",
    "Korean": "kr",
    "Hindi": "in"
  }