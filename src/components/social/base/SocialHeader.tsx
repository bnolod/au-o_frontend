import { FaMagnifyingGlass, FaPlus } from "react-icons/fa6";
import { useState } from "react";

export default function GroupHeader() {
    return (
        <div className="flex flex-row w-full gap-2 items-center h-12">
            <input 
                type="text" 
                placeholder="Search" 
                className="flex-1 h-full px-4 text-sm border-2 border-backdropSecondary secondary rounded-xl focus:border-highlightPrimary focus:outline-none" 
            />
            <button className="bg-highlightPrimary h-full aspect-square p-2 flex flex-col rounded-2xl">
                <FaMagnifyingGlass size={16} className="m-auto" />
            </button>
            <button 
                className="flex flex-row items-center justify-center h-full aspect-square hover:aspect-auto bg-highlightSecondary rounded-xl text-white transition-all duration-300 overflow-hidden group"
            >
                <span className="flex items-center justify-center w-full h-full transition-all duration-300 ease-in-out group-hover:w-auto group-hover:mx-2">
                    <FaPlus className="text-lg" />
                </span>
                <p className="w-0 ml-0 transition-all duration-300 ease-in-out group-hover:opacity-100 group-hover:w-auto group-hover:pr-2 text-nowrap">
                    Create Group
                </p>
            </button>
        </div>
    );
}
