import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostReactionBar from "./PostReactionBar";
import PostText from "./PostText";

export default function Post ({src, text}:{src:string, text:string}){
    return (
        <div className=" bg-background rounded-xl my-2 flex flex-col">
            <PostHeader></PostHeader>
            <PostImage src={src}/>
            <PostReactionBar/>
            <PostText text={text}/>
        </div>
    )
}