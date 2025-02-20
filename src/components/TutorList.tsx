'use client'
import TutorCard from "./TutorCard";

type TutorProfile = {
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
  };
  
type TutorListProps = {
    tutors: TutorProfile[];
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