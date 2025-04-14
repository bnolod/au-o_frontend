import { useEffect, useState } from 'react';
import Card from '../Card';
import { PostResponse } from '../../lib/types';
import { ImageList, ImageListItem, Modal } from '@mui/material';
import Post from '../postcomponents/Post';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getFavoritesOfUser, getPostsOfUser } from '../../lib/ApiCalls/PostApiCalls';
import { getAspectRatio } from '../../lib/functions';
import { Post as PostEntity } from '../../lib/entity/Post';
import { FaCarCrash } from 'react-icons/fa';

export default function PostDisplay({ userId, saved = false }: { userId: number; saved?: boolean }) {
  const [posts, setPosts] = useState<PostEntity[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostEntity | null>(null);

  const { user } = useAuthentication();

  useEffect(() => {
    async function load() {
      const res = saved ? await getFavoritesOfUser(userId) : await getPostsOfUser(userId);
      if (res) setPosts(res);
    }
    load();
  }, [saved, userId]);

  function handlePostClick(post: PostEntity) {
    setSelectedPost(post);
    setOpenModal(true);
  }

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} className="flex items-center justify-center p-4">
        {selectedPost ? <div className='w-1/2'><Post post={selectedPost} language="HU" user={user!} /> </div> : <div />}
      </Modal>

      <Card>
        {posts.length === 0 && <div className="text-center text-textColor/50 flex flex-col items-center p-3"><FaCarCrash className='text-6xl'/><p>{saved ? "No saved posts found." : "No posts found."}</p></div>}
        <ImageList variant="masonry" cols={2} gap={16}>
          {posts.slice().reverse().map((post) => (
            <ImageListItem key={post.postId}>
              <div className='w-full bg-backdropSecondary rounded-xl'>
              <img
                src={post.images[0]?.url}
                className="rounded-xl w-full object-cover cursor-pointer hover:opacity-75 transition-opacity bg-backdropPrimary"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  const aspectClass = getAspectRatio(img.naturalWidth, img.naturalHeight);
                  img.classList.add(aspectClass);
                }}
                onClick={() => handlePostClick(post)}
                alt="Post"
              />
              <p className='px-3 text-textColor/50 py-2 truncate'>{saved? <span className='text-textColor/90 font-semibold'>@{post.user.username}:</span> : ""} {post.text}</p>
              </div>
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </>
  );
}
