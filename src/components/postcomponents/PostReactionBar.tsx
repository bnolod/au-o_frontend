import { useContext } from "react";
import { MdAddComment } from "react-icons/md";
import { openCommentsContext } from "../../pages/MainPage";

export default function PostReactionBar() {
    let [openComments, setOpenComments] = useContext(openCommentsContext);
  
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
      <button className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg flex items-center " onClick={()=>{setOpenComments(!openComments)}}>
        <MdAddComment/> gomb
      </button>
      <div className=" flex flex-col flex-grow text-right">
        <p className="text-highlightPrimary">Tilted Towers</p>
        <p>2001.09.11</p>
      </div>
    </div>
  );
}
