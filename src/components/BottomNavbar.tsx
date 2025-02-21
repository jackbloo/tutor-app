'use client'
import { menuBar } from "@/constants";
import React from "react";
import { FaSearch, FaComment, FaCalendarAlt, FaBook } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";

const iconMapper = {
    search: FaSearch,
    messages: FaComment,
    schedule: FaCalendarAlt,
    vocab: FaBook,
}

const disabledRoutes = ['/messages', '/vocab'];

const BottomNavbar = () => {
const params = usePathname();
const { push } = useRouter();
const handleRoute = (route: string) => {
    if(disabledRoutes.includes(route)) return;
    push(route);
}
  return (
    <div className="fixed bottom-0 left-0 w-full bg-white shadow-lg py-2">
      <div className="flex justify-around items-center">
        {
            menuBar.map((item) => {
                const Icon = iconMapper[item.id as keyof typeof iconMapper];
                return(
                    <div className="flex flex-col items-center gap-2" key={item.id} onClick={() => handleRoute(item.route)} >
                    <Icon className={`text-xl ${params === item.route ? 'text-pink-500':'text-gray-600'} `} />
                    <span className={`text-xs ${params === item.route ? 'text-pink-500':'text-gray-600'}`}>{item.label}</span>
                  </div>
                )
            })
        }

      </div>
    </div>
  );
};

export default BottomNavbar;