import { MdAddComment } from "react-icons/md";
import { useCommentBoard } from "../../contexts/CommentContext";
import { PostResponse } from "../../lib/types";
import { addReaction } from "../../lib/apiClient";

export default function PostReactionBar({ post }: { post: PostResponse }) {
  const { toggleOpen } = useCommentBoard();

  function handleButtonPress() {
    //ide kene meg valamit irni
    //na igen
  }

  return (
    <div className="flex text-xs p-3 justify-between">
      <button
        className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"
        onClick={() => {
          addReaction("FIRE", "post", post.postId);
        }}
      >
        🔥 {post.reactionTypeMap.FIRE}
      </button>
      <button
        className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"
        onClick={() => {
          addReaction("COOL", "post", post.postId);
        }}
      >
        😎 {post.reactionTypeMap.COOL}
      </button>
      <button
        className="outline-highlightPrimary bg-backdropSecondary p-2 mx-1 rounded-lg"
        onClick={() => {
          addReaction("HEART", "post", post.postId);
        }}
      >
        😍 {post.reactionTypeMap.HEART}
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
