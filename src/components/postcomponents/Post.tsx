import { PostResponse, User } from "../../lib/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostReactionBar from "./PostReactionBar";
import PostText from "./PostText";

export default function Post ({post} :{post:  PostResponse}){
    //todo: multiple image support
    console.log(post)
    return (
        <div className=" bg-background rounded-xl my-2 flex flex-col">
            <PostHeader user={post.user}></PostHeader>
            <PostImage images={post.images}/>
            <PostReactionBar post={post}/>
            <PostText text={post.text}/>
        </div>
    )
}