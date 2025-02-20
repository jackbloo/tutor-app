'use client'
import { Tutor } from "@/store/tutorListStore";

export const getUniqueNativeLanguages = (database: Tutor[]) => {
    return [...new Set(database.flatMap((tutor) => 
      tutor.languageStacks
        .filter((stack) => stack.level === "Native")
        .map((stack) => stack.language) 
    ))];
  };
  