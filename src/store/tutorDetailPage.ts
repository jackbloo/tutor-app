'use client'
import { database } from '@/data';
import {create} from 'zustand'
import { Tutor } from './tutorListStore';


interface ITutorDetailState {
    tutorDetail: Tutor | null;
    getDetail: (id: number) => void;
  }

  export const useTutorDetailStore = create<ITutorDetailState>()((set) => ({
    tutorDetail: null,
    getDetail: (id: number) => {
        const currentDetail = database.find((data) => data.id === id)
        set({
            tutorDetail: currentDetail
        })
    }
  }));