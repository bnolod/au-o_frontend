import { useEffect, useState } from 'react';
import Card from '../Card';
import { PostResponse } from '../../lib/types';
import { ImageList, ImageListItem, Modal } from '@mui/material';
import Post from '../postcomponents/Post';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getFavoritesOfUser, getPostsOfUser } from '../../lib/ApiCalls/PostApiCalls';
import { getAspectRatio } from '../../lib/functions';

export default function PostDisplay({ userId, saved = false }: { userId: number; saved?: boolean }) {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostResponse | null>(null);

  const { user } = useAuthentication();

  useEffect(() => {
    async function load() {
      const res = saved ? await getFavoritesOfUser(userId) : await getPostsOfUser(userId);
      if (res) setPosts(res);
    }
    load();
  }, [saved, userId]);

  function handlePostClick(post: PostResponse) {
    setSelectedPost(post);
    setOpenModal(true);
  }

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} className="flex items-center justify-center p-4">
        {selectedPost ? <div className='w-1/2'><Post post={selectedPost} language="HU" user={user!} /> </div> : <div />}
      </Modal>

      <Card>
        {posts.length === 0 && <div className="text-center">No posts found.</div>}
        <ImageList variant="masonry" cols={2} gap={16}>
          {posts.slice().reverse().map((post) => (
            <ImageListItem key={post.postId}>
              <img
                src={post.images[0]?.url}
                className="rounded-xl w-full object-center cursor-pointer hover:opacity-75 transition-opacity"
                onLoad={(e) => {
                  const img = e.target as HTMLImageElement;
                  const aspectClass = getAspectRatio(img.naturalWidth, img.naturalHeight);
                  img.classList.add(aspectClass);
                }}
                onClick={() => handlePostClick(post)}
                alt="Post"
              />
            </ImageListItem>
          ))}
        </ImageList>
      </Card>
    </>
  );
}
