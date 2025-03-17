import { Card, ImageList, ImageListItem } from '@mui/material';
import { getAspectRatio } from '../../../lib/functions';
import { useEffect, useState } from 'react';
import { getGroupPosts } from '../../../lib/ApiCalls/GroupApiCalls';
import { PostResponse } from '../../../lib/types';
import { useNavigate } from 'react-router';
import Button from '../../Button';
import Post from '../../postcomponents/Post';
import { useAuthentication } from '../../../contexts/AuthenticationContext';

export default function GroupPostTab({
  tab,
  id,
  validMember,
}: {
  tab: 'posts' | 'members' | 'about' | 'chat' | 'options';
  id: number;
  validMember: boolean;
}) {

  const {user} = useAuthentication();
  useEffect(() => {
    init();
  }, [tab === 'posts']);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<PostResponse[]>([]);
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
        <Button className="w-full p-2 text-center" onClick={() => navigate('/group/' + id + '/post/create')}>
          Create a post
        </Button>
      )}
      {/* <ImageList variant="masonry" cols={2} gap={16}> */}
        {posts
          .slice()
          .reverse()
          .map((post) => (
            <Post user={user!} post={post} language='EN'>

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
