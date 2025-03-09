import { FaPlus } from "react-icons/fa6";

export default function SocialHeader() {
    return (
        <div className="flex flex-row items-center">
            <input type="text" placeholder="Search" className="w-full h-10 px-4 py-2 text-sm border-2 rounded-xl focus:border-highlightPrimary focus:outline-none" />
            <button className="flex justify-center items-center w-10 h-10 ml-2 text-white bg-highlightSecondary rounded-xl">
                <FaPlus className="t2x" />
            </button>
        </div>
    )
}