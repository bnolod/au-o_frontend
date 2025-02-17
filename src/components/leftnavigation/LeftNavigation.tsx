import { ReactNode } from "react"
import ProfileImage from "../ProfileImage"
import Comment from "./Comment"
import { MdEmojiEvents, MdFace, MdGroup, MdGroups, MdHomeFilled, MdMessage } from "react-icons/md"

function NavItem({iconSvg,text,onClick}:{iconSvg:ReactNode, text:string, onClick?:React.MouseEventHandler<HTMLButtonElement>}){
    return (
        <button className="flex text-5xl items-center py-3" onClick={onClick}>
            {iconSvg}
            <h3 className="text-xl p-2">{text}</h3>
        </button>
    )
}

export default function LeftNavigation(){
    return (
        <div className=" md:w-3/12 fixed left-3 flex flex-col">
            <NavItem iconSvg={<MdHomeFilled/>} text="Home"/>
            <NavItem iconSvg={<MdGroups/>} text="Groups"/>
            <NavItem iconSvg={<MdEmojiEvents/>} text="Events"/>
            <NavItem iconSvg={<MdFace/>} text="Profile"/>
            <NavItem iconSvg={<MdMessage/>} text="Messages"/>
            
            
                    {/*<div className=" md:w-3/12 fixed left-0 bg-cyan-50"></div>*/}

     
        </div>
    )
}   