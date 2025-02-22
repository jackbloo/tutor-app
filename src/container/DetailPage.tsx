'use client'
import useDetailPage from '@/hooks/useDetailPage';
import Image from 'next/image';
import React from 'react';
import { IoArrowBackOutline } from "react-icons/io5";
import { MdVerifiedUser } from "react-icons/md";
import { MdIosShare } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { MdVerified } from "react-icons/md";
import BottomSheet from '@/components/BottomSheet';
import { MdOutlineQuickreply } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";

const Detail = () => {
    const {tutorDetail, backToHome, isBookModalOpen, setIsBookModalOpen, handleBookRightNow, handleBookingLater} = useDetailPage()
    if(!tutorDetail) return null
    const {image, flag, name, reviews, price, description, lessons, languageStacks, countryOfBirth} = tutorDetail
  return (
    <>
    <div className="flex flex-col min-h-screen bg-gray-100">
            <div className='flex flex-row justify-between p-4'>
            <IoArrowBackOutline onClick={backToHome}/>
            <div className='flex flex-row gap-4'>
            <MdIosShare />
            <FaRegHeart />
            </div>
        </div>
        <div>
        {/* Default video player */}
        <video width="600" controls>
        <source src="/default_video.mp4" type="video/mp4" />
      Your browser does not support the video tag.
        </video>
        </div>
      <div className="flex flex-col gap-4 bg-white rounded-lg shadow-lg">
        {/* Tutor Profile Header */}
        <div className='flex flex-row gap-2 p-4'>
        <Image
            src={`${image}&format=webp`}
            alt="Tutor"
            width={64} height={64} className="w-16 h-16 rounded-[5px] object-cover" 
          />
          <div className='flex flex-col flex-1'>
          <h2 className="text-xl font-semibold" style={{maxWidth: 200}}>{name}</h2>
          <p className="flex flex-row text-xs text-gray-500 gap-2" style={{padding: 0,margin: 0}}><span>Country of birth: {countryOfBirth}</span><Image src={`https://flagcdn.com/w320/${flag}.webp`} width={24} height={16} alt={flag} className='object-cover' style={{height: 'auto', borderRadius: 2}}/></p>
          </div>
        </div>
        {/*Summary Section */}
        <div className="flex  justify-center gap-2" style={{borderTop: '1px solid #dedde5', borderBottom: '1px solid #dedde5', padding: '16px 16px', margin: '0px 16px'}}>
            <div className='flex flex-col items-center justify-between gap-1'>
                <div className='mt-1'>
                    <MdVerifiedUser size={30}/>
                </div>
                <div className='text-xs text-gray-500'>
                    verified
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <div className='font-semibold' style={{fontSize: 25}}>
                ★5
                </div>
                <div className='text-xs text-gray-500'>
                    rating
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <div className='font-semibold' style={{fontSize: 25}}>
                    {price}
                </div>
                <div className='text-xs text-gray-500'>
                    per lesson
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <div className='font-semibold' style={{fontSize: 25}}>
                    {reviews}
                </div>
                <div className='text-xs text-gray-500'>
                    reviews
                </div>
            </div>
            <div className='flex flex-col items-center gap-1'>
                <div className='font-semibold' style={{fontSize: 25}}>
                    {lessons}
                </div>
                <div className='text-xs text-gray-500'>
                    lessons
                </div>
            </div>
        </div>
         {/* Refundable Section */}
        <div className="flex flex-col gap-4 p-4 ">
            <div className='flex flex-row gap-4 items-center'>
                <div>
                <MdVerified color='black' size={25} />
                </div>
                <div>
                <p className="text-sm font-semibold">100% refundable</p>
                <p className="text-sm text-gray-600">Try another tutor for free or get a refund of your unused balance</p>
                </div>
            </div>
            <div className='flex flex-row gap-4 items-center'>
                <div>
                <HiArrowTrendingUp color='black' size={25}/>
                </div>
                <div>
                <p className="text-sm font-semibold">High demand</p>
                <p className="text-sm text-gray-600">21 lessons booked in the last 48 hours</p>
                </div>
            </div>
            </div>
        {/* About Me Section */}
        <div className="p-4" style={{boxShadow: '0 -10px 20px -10px rgba(0, 0, 0, 0.1)'}}>
          <h3 className="text-lg font-semibold">About me</h3>
          <p className="text-sm text-gray-600 mt-2">
            {description}
          </p>
          <button className='rounded-lg w-full mt-4 font-semibold' style={{border: '2px solid #dedde5', padding: '8px'}}>Read more</button>
        </div>

        {/* Languages Section */}
        <div style={{borderTop: '1px solid #dedde5', borderBottom: '1px solid #dedde5', margin: '0px 16px', padding: '16px 0px'}}>
          <h3 className="text-lg font-semibold">I speak</h3>
          <div className="flex flex-col mt-2 gap-4">
            {languageStacks.map((language) => (
            <span className="text-xm" key={language.language}>{language.language} <span className='font-semibold text-sm ml-2' style={{background: language.level === 'Native' ? '#d7f8f2' : '#cbe2ff', borderRadius: 5, padding: 4}}>{language.level}</span> </span>
            ))}
          </div>
        </div>

        {/* Sechedule Section */}
        <button className='rounded-lg w-auto font-semibold' style={{border: '2px solid black', padding: '8px', margin: '4px 16px'}}>See my schedule</button>

        {/* Review Section */}
        <div className="mt-4 p-4 w-full">
            <div>
            <h3 className="text-lg font-semibold">5★ - {reviews} reviews</h3>
            </div>
          <div className='flex gap-2 mt-2' style={{overflow: 'auto', marginRight: -20}}>
            {
                Array(Number(reviews)).fill('').map((_, index) => (
                    <div className="flex flex-col gap-4 rounded-lg p-4" style={{border: '2px solid #dedde5', minWidth: 300}} key={index}>
                        <div className='flex flex-row gap-4'>
                            <div>
                            <Image
                      src="/dummy_avatar.png"
                      alt="Reviewer"
                      className="rounded-lg object-cover"
                      width={40}
                      height={10}
                    />
                            </div>
                            <div>
                            <p className="font-semibold">Kasia</p>
                            <p className="text-sm text-gray-500">1 week ago</p>
                            </div>

                            </div>

                    <div>

                      <p className="text-sm text-gray-700 mt-1">The best teacher I ever had! Lessons are very professional and also joyful.</p>
                      <button className="text-blue-500 text-xs mt-2">Show more</button>
                    </div>
                  </div>
                ))
            }

          </div>
          <button className='rounded-lg w-full mt-4 font-semibold' style={{border: '2px solid #dedde5', padding: '8px'}}>Show all {reviews} reviews</button>
        </div>

        {/* Report Button */}
        <button className=" px-4 py-2 rounded-lg w-full text-xs" style={{textDecoration: 'underline', marginBottom: 100}}>Report an issue</button>
        {/* Book Button */}
        <div className="fixed bottom-0 mt-6 flex space-x-4 p-4 w-full bg-white" style={{boxShadow: '0 -10px 20px -10px rgba(0, 0, 0, 0.1)'}}>
          <button className=" font-semibold px-6 py-2 rounded-lg w-full" style={{border: '2px solid black', background: '#ff7aac'}} onClick={() => setIsBookModalOpen(true)}>Book tutor</button>
        </div>
      </div>
    </div>
    <BottomSheet isOpen={isBookModalOpen} setIsOpen={() => setIsBookModalOpen(false)}>
            <div className='flex flex-col gap-4'>
                <div className='font-bold' style={{fontSize: 24}}>
                    When do you want to take your trial ?
                </div>
                <div className='flex flex-col gap-2'>
                <div className='flex flex-col gap-1' style={{border: '2px solid #dedde5', padding: 16, borderRadius: 5}} onClick={handleBookRightNow}>
                    <div>
                    <MdOutlineQuickreply size={20}/>
                    </div>
                    <div className='text-sm font-bold'>
                        Right now
                    </div>
                    <div className='text-sm'>
                        Book a  trial and meet your tutor right now.
                    </div>
                </div>

                <div className='flex flex-col gap-1' style={{border: '2px solid #dedde5', padding: 16, borderRadius: 5}} onClick={handleBookingLater}>
                    <div>
                    <FaRegCalendarAlt size={20} />
                    </div>
                    <div className='text-sm font-bold'>
                        Later
                    </div>
                    <div className='text-sm'>
                        Choose a date and time that works for you
                    </div>
                </div>
                </div>

            </div>
    </BottomSheet>
    </>
  );
};

export default Detail;