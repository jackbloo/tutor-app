'use client'
import useConfirmationPage from '@/hooks/useConfirmationPage';
import { formatDateWithDuration } from '@/utils';
import React from 'react';

const ConfirmationPage = () => {
  const {data, handleToSchedule} = useConfirmationPage();
  const currentDate = formatDateWithDuration(data?.time || '', Number(data?.duration))
  return (
    <div className="bg-pink-500 text-white flex flex-col justify-between items-center min-h-screen" style={{background: '#ff7aac', padding: 16}}>
      <div className="text-center">
        <h1 className="font-bold mb-4" style={{fontSize: 32}}>
          We&apos;ll tell {data?.name} you&apos;re ready to start!
        </h1>
        <p className="text-lg mb-6">
          Your first lesson is {currentDate}.
        </p>
      </div>
      
      <button className=" py-3 px-8 rounded-full text-lg w-full max-w-xs" style={{background: 'black', margin: '0px px', color: 'white', padding: 8, borderRadius: 5}} onClick={handleToSchedule}>
        Get ready for your lesson
      </button>
    </div>
  );
};

export default ConfirmationPage;