import { Modal } from "@mui/material";
import { Post as postEntity } from "../../lib/entity/Post";
import { User } from "../../lib/types";
import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostReactionBar from "./PostReactionBar";
import PostText from "./PostText";
import PostEditModal from "./PostEditModal";
import { useState } from "react";

export default function Post ({post, language,preview = false, user, groupView, loadPosts} :{preview?: boolean, user: User, post:  postEntity, language: 'HU' | 'EN', groupView?: boolean, loadPosts: () => void}) {
    //todo: multiple image support
    const [open, setOpen] = useState(false);
    return (
        <div className="outline-none bg-background rounded-3xl mb-6 flex flex-col shadow-[#00000055] shadow-lg overflow-hidden text-textColor">
            <PostHeader onEdit={() => setOpen(true)} favorite={post.favorite} user={post.user} post={post} postId={post.postId} groupView={groupView} loadPosts={()=>loadPosts()}></PostHeader>
            <PostImage onImageRemove={() => {}} images={post.images} car={post.vehicle ? post.vehicle : undefined}/>
            <PostReactionBar preview={preview} user={user} language={language} post={post}/>
            <PostText text={post.text} user={post.user}/>
            {
                user && user.id === post.user.id && !preview && (
                    <Modal open={open} onClose={() => setOpen(false)} className="flex bg-backdropSecondary h-fit m-auto p-2 rounded-xl text-textColor w-3/4 lg:w-2/3 xl:w-1/3 justify-center items-center">
                        <PostEditModal onClose={() => setOpen(false)} post={post} />
                    </Modal>
                )
            }
        </div>
    )
}