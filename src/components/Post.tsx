import PostHeader from "./postcomponents/PostHeader";
import PostImage from "./postcomponents/PostImage";
import PostReactionBar from "./postcomponents/PostReactionBar";
import PostText from "./postcomponents/PostText";

export default function Post ({src, text}:{src:string, text:string}){
    return (
        <div className=" bg-background rounded-xl my-2 flex flex-col text-textColor">
            <PostHeader></PostHeader>
            <PostImage src={src}/>
            <PostReactionBar/>
            <PostText text={text}/>
        </div>
    )
}