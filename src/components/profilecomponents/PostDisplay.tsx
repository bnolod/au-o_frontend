import { useEffect, useState } from 'react';
import { apiFetch } from '../../lib/apiClient';
import Card from '../Card';
import { PostResponse } from '../../lib/types';
import { ImageList, ImageListItem, Modal } from '@mui/material';
import { getPost } from '../../lib/ApiCalls/PostApiCalls';
import Post from '../postcomponents/Post';
import { useAuthentication } from '../../contexts/AuthenticationContext';

export default function PostDisplay({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPostIndex, setSelectedPostIndex] = useState<number>(0);
  const [selectedPost, setSelectedPost] = useState<PostResponse>();

  const { user } = useAuthentication();

  useEffect(() => {
    async function load() {
      const res = await apiFetch<PostResponse[]>(`users/user/${userId}/posts`);
      if (res && res.data) {
        setPosts(res.data);
      }
    }
    load();
  }, []);


  function handlePostClick(Post: PostResponse) {
    setSelectedPost(Post);
    setOpenModal(true);
  }

  //TODO: modal overflows on wide screens

  return (
    <>
      <Modal open={openModal} onClose={() => setOpenModal(false)} className="w-5/6 m-auto h-5/6 text-textColor">
        <Post post={selectedPost!} language="HU" user={user!} />
      </Modal>
      <Card className="">
        {posts.length == 0 && <div className="text-center">jaj</div>}
        <ImageList variant="masonry" cols={2} gap={8}>
          {posts.length > 0 &&
            posts.map((post) => (
              <ImageListItem key={post.postId}>
                <img
                  src={post.images[0].url}
                  className="rounded-l"
                  onClick={() => {
                    handlePostClick(post);
                  }}
                ></img>
              </ImageListItem>
            ))}
        </ImageList>
      </Card>
    </>
  );
}
