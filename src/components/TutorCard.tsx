'use client'
import Image from "next/image";
import { IoPerson } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";

const TutorCard = ({ image, name, flag, rating, reviews, price, lessonDuration, description, students, lessons, languages, isSuperTutor }:any) => {
    return (
      <div className="flex flex-col bg-white p-4 shadow-md">
        <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-4">
                <div>
                <Image src={`${image}&format=webp`} alt={name} width={64} height={64} className="w-16 h-16 rounded-[5px] object-cover" />
                </div>
            <div className="flex flex-col flex-1">
                <div className="flex flex-row gap-2 items-center">
                <h3 className="text-xl font-semibold flex items-center">
              {name} <span className="ml-2"><Image src={`https://flagcdn.com/w320/${flag}.webp`} width={20} height={'20'} alt={flag}/></span>
            </h3>
            <MdVerifiedUser />
                </div>
                {
                    isSuperTutor && (
                        <div className="w-[90px] px-2 py-1 flex-grow-0 rounded-lg text-xs font-medium text-gray-70 bg-pink-100">
                        Super Tutor
                    </div>
                    )
                }

            <div className="flex flex-row justify-between mt-1">
            <div className="text-left">
            <span className="block text-lg font-semibold">{price}</span>
            <span className="text-sm text-gray-500">{lessonDuration}</span>
          </div>
            <div className="flex flex-col">
              <span className="block text-lg font-semibold">{rating}★</span>
              <span className="text-sm text-gray-500">{reviews} reviews</span>
            </div>
            </div>

            </div>
            </div>

          <div className="flex-1">

            <div className="text-sm text-black font-bold">{description}</div>
            <div className="mt-2 text-sm text-gray-600 flex flex-row gap-2 items-center">
           <IoPerson className="text-gray-400" /> <span>{students} students • {lessons} lessons</span>
            </div>
            <div className="mt-2 flex space-x-2 text-sm text-gray-600">
              <span>Speaks: {languages}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default TutorCard