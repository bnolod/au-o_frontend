import { MdAddComment } from "react-icons/md";
import { useCommentBoard } from "../../contexts/CommentContext";
import { PostResponse } from "../../lib/types";

export default function PostReactionBar({location}:PostResponse) {
    const {toggleOpen} = useCommentBoard();
  
    return (
    <div className="flex text-xs p-3 justify-between">
      <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg">
        {" "}
        🔥 gomb
      </button>
      <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg">
        {" "}
        😎 gomb
      </button>
      <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg">
        {" "}
        😍 gomb
      </button>
      <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg flex items-center " onClick={()=>{toggleOpen()}}>
        <MdAddComment/> gomb
      </button>
      <div className=" flex flex-col flex-grow text-right">
        <p className="text-highlightPrimary">{location}</p>
        <p>2</p>
      </div>
    </div>
  );
}
