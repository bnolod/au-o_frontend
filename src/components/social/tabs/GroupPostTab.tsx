import { Card, ImageList, ImageListItem } from '@mui/material';
import { getAspectRatio } from '../../../lib/functions';
import { useEffect, useState } from 'react';
import { getGroupPosts } from '../../../lib/ApiCalls/GroupApiCalls';
import { PostResponse } from '../../../lib/types';
import { NavLink, useNavigate } from 'react-router';
import Button from '../../Button';
import Post from '../../postcomponents/Post';
import { useAuthentication } from '../../../contexts/AuthenticationContext';
import { Post as PostEntity } from '../../../lib/entity/Post';

export default function GroupPostTab({
  tab,
  id,
  validMember,
  isAuthorized
}: {
  tab: 'posts' | 'members' | 'about' | 'chat' | 'options';
  id: number;
  validMember: boolean;
  isAuthorized: boolean;
}) {

  const {user} = useAuthentication();
  useEffect(() => {
    init();
  }, [tab === 'posts']);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostEntity[]>([]);
  async function init() {
    const res = await getGroupPosts(id);
    if (res) {
      setPosts(res);
    }
  }
  return (
    <div className="my-2 flex flex-col gap-6">
      {posts.length === 0 && <div className="text-center text-textColor">No posts found.</div>}
      {validMember && (
        <NavLink className=" bg-highlightSecondary p-4 rounded-xl text-xl text-center" to={'/groups/' + id + '/post/create'}>
          Create a post
        </NavLink>
      )}
      {/* <ImageList variant="masonry" cols={2} gap={16}> */}
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <Post groupView user={user!} post={post} isAuthorized={isAuthorized} language='EN' loadPosts={() => {init()}}>

            </Post>
            // <ImageListItem key={post.postId}>
            //   <img
            //     src={post.images[0]?.url}
            //     className="rounded-xl w-full object-center cursor-pointer hover:opacity-75 transition-opacity"
            //     onLoad={(e) => {
            //       const img = e.target as HTMLImageElement;
            //       const aspectClass = getAspectRatio(img.naturalWidth, img.naturalHeight);
            //       img.classList.add(aspectClass);
            //     }}
            //     onClick={() => navigate('/post/' + post.postId)}
            //     alt="Post"
            //   />
            // </ImageListItem>
          ))}
      {/* </ImageList> */}
    </div>
  );
}
