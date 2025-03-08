import { Reply } from "../../lib/types";
import ProfileImage from "../ProfileImage";

export default function ReplyItem({ reply }: { reply: Reply }) {
    return (
        <div className="w-full">
            <div className="w-1 bg-backdropSecondary h-full rounded-b"></div>
            <div className="flex justify-start">
                <ProfileImage className="scale-90 aspect-square"></ProfileImage>
                <div className="flex flex-col flex-grow">
                    <h1 className="font-bold">{reply.user.nickname}</h1>
                    <p className="text-xs">@{reply.user.username}</p>
                </div>
                <p className="text-xs justify-self-end">{reply.time.split("T")[0]}</p>
            </div>
            <div className="flex flex-col">
                <p className="ml-12">{reply.text}</p>
            </div>
            <div>
            </div>
        </div>
    );
}