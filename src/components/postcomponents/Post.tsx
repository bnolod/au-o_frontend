import { Post as postEntity } from "../../lib/entity/Post";
import { User } from "../../lib/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostReactionBar from "./PostReactionBar";
import PostText from "./PostText";

export default function Post ({post, language,preview = false, user} :{preview?: boolean, user: User, post:  postEntity, language: 'HU' | 'EN'}) {
    //todo: multiple image support
    console.log(post)
    return (
        <div className="outline-none bg-background rounded-3xl mb-6 flex flex-col shadow-[#00000055] shadow-lg overflow-hidden text-textColor">
            <PostHeader favorite={post.favorite} user={post.user} post={post} postId={post.postId}></PostHeader>
            <PostImage images={post.images}/>
            <PostReactionBar preview={preview} user={user} language={language} post={post}/>
            <PostText text={post.text} user={post.user}/>
        </div>
    )
}