import { database } from '@/data';
import {create} from 'zustand'

interface Tutor {
    id: number;
    isSuperTutor?: boolean;
    image: string;
    name: string;
    flag: string;
    rating: string;
    reviews: string;
    price: string;
    lessonDuration: string;
    description: string;
    students: string;
    lessons: string;
    languages: string;
    languageStacks: { [key: string]: string }[];
}

interface Isort {
    type: 'asc' | 'desc';
    field: string;
}

interface ITutorState {
    tutors?: any;
    isLoading?: boolean;
    getList: () => Promise<void>;
    currentFilters: {[key:string]: boolean}
    setFilter: (filter: string) => void;
    languages: string[];
    currentLanguage: string;
    sort: Isort;
    setSort: (sort: Isort) => void;
  }

  export const useTutorStore = create<ITutorState>()((set, get) => ({
    tutors: [],
    getList: async () => {
        set({ isLoading: true });
        try {
        // Filter by multiple filters
        const currentFilters = get().currentFilters;
        const currentSort = get().sort;
        let data: Tutor[] = [...database]
        if (currentFilters && Object.keys(currentFilters).length > 0) {
            Object.keys(currentFilters).forEach((filter) => {
                if(currentFilters[filter] === false) return;
                switch(filter){
                    case 'isSuperTutor':
                        data = data.filter((tutor) => tutor.isSuperTutor);
                        break;
                    case 'native':
                        data = data.filter((tutor) => tutor.languageStacks.some((language) => language.level === 'Native'));
                        break;
                    case 'price':
                        data = data.filter((tutor) => {
                        const price = tutor.price.replace('$', '');
                        return Number(price) <= 40})
                    default:
                        break;
                }
            });
        }
    
        // Sort
        if (currentSort) {
            data = [...data].sort((a, b) => {
                switch(currentSort.field){
                    case 'price-lowest':
                        return  Number(a.price.replace('$', '')) - Number(b.price.replace('$', ''));
                    case 'price-highest':
                        return Number(b.price.replace('$', '')) - Number(a.price.replace('$', ''));
                    case 'rating':
                        return currentSort.type === "asc" ? Number(a.rating) - Number(b.rating) : Number(b.rating) - Number(a.rating);
                    case 'reviews':
                        return currentSort.type === "asc" ? Number(a.reviews) - Number(b.reviews) : Number(b.reviews) - Number(a.reviews);
                    case 'popularity':
                        return currentSort.type === "asc" ? Number(a.students) - Number(b.students) : Number(b.students) - Number(a.students);
                    default:
                        return 0;
                }
            });        }
            set({ tutors: data });
        } catch (error) {
            console.error(error);
        } finally {
            set({ isLoading: false });
        }
    },
    isLoading: true,
    currentFilters: {},
    setFilter: (filter: string) => {
        set((state) => ({
            currentFilters: {
                ...state.currentFilters,
                [filter]: !state.currentFilters[filter]
            }
        }))
    },
    languages: [],
    currentLanguage: 'All',
    sort: {
        type: 'asc',
        field: 'price-lowest'
    },
    setSort: (sort: Isort) => {
        set({sort})
    }
  }));