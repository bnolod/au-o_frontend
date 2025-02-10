import { MdAddComment } from "react-icons/md";
import { useCommentBoard } from "../../contexts/CommentContext";

export default function PostReactionBar() {
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
        <p className="text-highlightPrimary">Tilted Towers</p>
        <p>2001.09.11</p>
      </div>
    </div>
  );
}
