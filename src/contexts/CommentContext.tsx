import { createContext, useContext, useState } from "react";
import { CommentContextType } from "../lib/types";

export const CommentContext = createContext<CommentContextType>({
    isOpen: false,
    setIsOpen: () => {},
    toggleOpen: () => {},
})
export const CommentProvider = ({children}: {children: React.ReactNode}) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const toggleOpen = () => {
        setIsOpen(!isOpen);
    }
    return (
        <CommentContext.Provider value={{isOpen, setIsOpen, toggleOpen}}>
            {children}
        </CommentContext.Provider>
    )
}
export const useCommentBoard = () => {
    return useContext(CommentContext);
}
