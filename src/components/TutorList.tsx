'use client'
import { Tutor } from "@/store/tutorListStore";
import TutorCard from "./TutorCard";

  
type TutorListProps = {
    tutors: Tutor[];
};

const TutorList = ({tutors = []}: TutorListProps) => {
    return (
      <div className="space-y-2 bg-gray-200 pt-2 pb-16 min-h-screen">
        {tutors.map((tutor) => (
            <TutorCard
                key={tutor.name}
                {...tutor}
            />
        ))}
      </div>
    );
  };

  export default TutorList