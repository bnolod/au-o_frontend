import { MdAddComment } from "react-icons/md";
import { useCommentBoard } from "../../contexts/CommentContext";
import { PostResponse } from "../../lib/types";
import { addReaction } from "../../lib/apiClient";
import { useState, useEffect } from "react";

export default function PostReactionBar({ post }: { post: PostResponse }) {
  const { toggleOpen } = useCommentBoard();
  const typeMap = {
    FIRE: post.reactionTypeMap ? post.reactionTypeMap.FIRE : 0,
    COOL: post.reactionTypeMap !== null ? post.reactionTypeMap.COOL : 0,
    HEART: post.reactionTypeMap ? post.reactionTypeMap.HEART : 0,
  }
  const [addedReaction, setAddedReaction] = useState<
    "FIRE" | "COOL" | "HEART" | null
  >(post.reactedWith);
  function handleReaction(reaction: "FIRE" | "COOL" | "HEART" | null) {
    if (addedReaction === reaction) {
    
      setAddedReaction(null);
    } else {
        setAddedReaction(reaction);
      
    }
  }

  useEffect(() => {
    console.log("postReactionBar", addedReaction);
  }, [addedReaction]);
  return (
    <div
      key={addedReaction ? addedReaction : "NONE" + post.postId}
      className="flex text-xs p-3 justify-between"
    >
      <button
        key={addedReaction ? addedReaction : "NONE" + post.postId}
        className={`outline-highlightPrimary  p-2 mx-1 rounded-lg disabled:opacity-50 ${
          (addedReaction === "FIRE" && post.reactedWith === "FIRE") || (addedReaction === "FIRE" && post.reactedWith === null) 
            ? "bg-highlightPrimary"
            : "bg-backdropSecondary"
        }`}
        onClick={() => {
          handleReaction("FIRE");
          addReaction("FIRE", "post", post.postId);
        }}
        disabled={addedReaction !== "FIRE" && addedReaction !== null}
      >
        🔥  {(typeMap.FIRE > 0 || post.reactedWith === "FIRE") && typeMap.FIRE + (post.reactedWith === null && addedReaction === "FIRE" ? 1 : 0) - (post.reactedWith === "FIRE" && addedReaction === null ? 1 : 0)}
      </button>
      <button
        className={`outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg disabled:opacity-50 ${
          (addedReaction === "COOL" && post.reactedWith === "COOL") || (addedReaction === "COOL" && post.reactedWith === null) 
            ? "bg-highlightPrimary"
            : "bg-backdropSecondary"
        }`}
        onClick={() => {
          handleReaction("COOL");
          addReaction("COOL", "post", post.postId);
        }}
        disabled={addedReaction !== "COOL" && addedReaction !== null}
      >
        😎   {(typeMap.COOL > 0 || post.reactedWith === "COOL") && typeMap.COOL + (post.reactedWith === null && addedReaction === "COOL" ? 1 : 0) - (post.reactedWith === "COOL" && addedReaction === null ? 1 : 0)}
      </button>
      <button
        className={`outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg disabled:opacity-50 ${
          (addedReaction === "HEART" && post.reactedWith === "HEART") || (addedReaction === "HEART" && post.reactedWith === null) 
            ? "bg-highlightPrimary"
            : "bg-backdropSecondary"
        }`}
        onClick={() => {
          handleReaction("HEART");
          addReaction("HEART", "post", post.postId);
        }}
        disabled={addedReaction !== "HEART" && addedReaction !== null}
      >
        😍  {(typeMap.HEART > 0 || post.reactedWith === "HEART") && typeMap.HEART + (post.reactedWith === null && addedReaction === "HEART" ? 1 : 0) - (post.reactedWith === "HEART" && addedReaction === null ? 1 : 0)}
      </button>
      <button
        className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg flex items-center "
        onClick={() => {
          toggleOpen();
        }}
      >
        <MdAddComment /> gomb
      </button>
      <div className=" flex flex-col flex-grow text-right">
        <p className="text-highlightPrimary">{post.location}</p>
        <p>2</p>
      </div>
    </div>
  );
}
