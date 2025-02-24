import ProfileImage from "../ProfileImage"
import Comment from "./Comment"

export default function CommentBoard({isOpen=false}:{isOpen:boolean}){
    return (
        isOpen && 
        <div className="bg-background rounded-xl my-2 max-h-[80vh] flex flex-col p-3">
            <h1 className="self-center">Comments</h1>
            <div className="flex flex-col overflow-y-scroll">
                <Comment replies={true} ></Comment>
                <Comment replies={false} ></Comment>

            </div>

            <div className="basis-2/12 flex flex-col justify-between">
                <hr className=""/>
                <div className="flex items-center justify-between gap-1">
                    <ProfileImage className="scale-90"/>
                    <input type="text" className="rounded-full p-3 flex-grow w-full" placeholder="Írj valamit" />
                </div>
            </div>
        </div>
    
    )
}