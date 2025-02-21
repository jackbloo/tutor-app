'use client'
import BottomNavbar from "@/components/BottomNavbar";
import BottomSheet from "@/components/BottomSheet";
import Skeleton from "@/components/LoadingComponent";
import TutorList from "@/components/TutorList";
import { filters, flagMap, sortOptions } from "@/constants";
import useSearchPage from "@/hooks/useSearchPage";
import { BiSolidDownArrow } from "react-icons/bi";
import { RiSortAsc, RiSortDesc } from "react-icons/ri";
import { IoMdCheckmark } from "react-icons/io";
import Modal from "@/components/Modal";
import Image from "next/image";
import { FaChevronRight } from "react-icons/fa6";



const SearchPage = () => {
    const { isVisible, isLoading, tutors, titleRef, currentFilters, setFilter, currentLanguage, setSort, sort, isSortModalOpen, setIsSortModalOpen, availableLanguages, setCurrentLanguage, isLanguageModalOpen, setIsLanguageModalOpen } = useSearchPage();

    return (
      <>
      <div className="h-screen w-full">
        <div className="flex flex-row items-center gap-2 text-3xl font-semibold text-gray-800 mb-6" style={{padding: '16px 16px 0px 16px'}} ref={titleRef} onClick={() => setIsLanguageModalOpen(true)}>
            {currentLanguage}
            <BiSolidDownArrow size={10} />
            </div>
        <div className="w-full" style={{position: isVisible || isLoading || tutors?.length < 3 ? 'relative':'fixed' , top: 0, background: 'white'}}>
            <div className="flex flex-col gap-4" style={{padding: '16px 16px'}}>
            <div className="flex flex-row gap-4">
                {
                    filters.map((filter) => (
                        <button key={filter.id} className="text-black font-semibold text-sm" style={{border: `1px solid ${Boolean(currentFilters[filter.id]) ? 'pink' : '#E0E0E0'}`, borderRadius: '10px', padding: '8px 16px'}} onClick={() => setFilter(filter.id)}>{filter.label}</button>))
                }
            </div>

            </div>
            <div className="flex flex-row justify-between items-center" style={{padding: '0px 16px 16px 16px'}}>
                <div className="text-xs text-gray-300">
                    {tutors.length} Tutors
                </div>
                <div className="text-xs font-semibold flex flex-row items-center gap-2">
                    <div onClick={() => setIsSortModalOpen(true)}>
                    Sort by {sort.field}
                    </div>
                    <div onClick={() => setSort({
                        ...sort,
                        type: sort.type === 'asc' ? 'desc' : 'asc' as 'asc' | 'desc'
                    })}>
                        {sort.type === 'asc' ? <RiSortDesc /> : <RiSortAsc />}
                    </div>
                </div>
            </div>
        </div>
        {
            isLoading ?   <Skeleton/> : <TutorList tutors={tutors} />
        }
        
      </div>
     <BottomNavbar/>
            <BottomSheet isOpen={isSortModalOpen} setIsOpen={() => setIsSortModalOpen(false)}>
            <div className="bg-white p-4 ">
           <div className="font-semibold" style={{fontSize: 32, marginBottom: 28}}>Sort tutors by</div>
           <div className="space-y-2">
               {
                   sortOptions.map((option) => (
                    <div key={option.id} className="flex flex-col py-2 gap-4" onClick={() => {
                        setSort({
                           ...sort,
                           field: option.id
                       })
                       setIsSortModalOpen(false)
                       }}>
                           <div className="flex flex-row justify-between items-center">
                           <div className="peer-checked:bg-blue-500 peer-checked:text-white peer-checked:border-blue-500 border border-gray-300 p-2 rounded cursor-pointer">
                         {option.label}
                       </div>
                       <div>
                       {sort.field === option.id && <IoMdCheckmark />}
                       </div>
                           </div>
                       <div className="w-full">
                       <hr className="border-t border-gray-300 my-4 w-full" />
                       </div>
                     </div>
                   ))
               }
       
           </div>
         </div>
            </BottomSheet>
    <Modal isOpen={isLanguageModalOpen} setIsOpen={() => setIsLanguageModalOpen(false)}>
        <div className="flex flex-col mt-4">
            <div className="font-semibold" style={{fontSize: 28}}>
            Hi there! What would you like to learn?
            </div>
            <div className="flex flex-col gap-2 mt-4">
                {availableLanguages.map((language) => 
                <div key={language} className="flex flex-row justify-between items-center px-2 py-2 rounded-lg" style={{border: '1px solid rgb(0,0,0,0.2)'}} onClick={() => {
                    setCurrentLanguage(language)
                    setIsLanguageModalOpen(false)
                    }}>
                    <div className="flex flex-row items-center gap-2 text-sm">
                    <Image src={`https://flagcdn.com/w320/${flagMap[language]}.webp`} width={20} height={20} alt={language}/>
                    {language}
                    </div>
                    <div>
                    <FaChevronRight/>
                    </div>
                </div>)}
            </div>
            <div className="font-semibold underline text-sm mt-2" style={{textDecoration: 'underline'}} onClick={() => {
            setCurrentLanguage('All')
            setIsLanguageModalOpen(false)
            }}>
                Show all
            </div>
        </div>
    </Modal>
     </>
    );
  };

  export default SearchPage
