import ProfileImage from "../ProfileImage"
import Comment from "./Comment"

export default function CommentBoard(){
    return (
        <div className="bg-background rounded-xl my-2 h-96 w-full flex flex-col p-3">
            <h1 className="self-center">Comments</h1>
            <div className="flex-grow">
                <Comment replies={true} ></Comment>
            </div>
            <div className="basis-2/12 flex flex-col justify-between">
                <hr className=""/>
                <div className="flex items-center justify-between">
                    <ProfileImage/>
                    <input type="text" className="p-3 rounded-full flex-grow ml-3" placeholder="Írj valamit" />
                </div>
            </div>
        </div>
    )
}