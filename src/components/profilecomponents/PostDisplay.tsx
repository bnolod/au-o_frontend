import { useEffect, useState } from 'react';
import Card from '../Card';
import { PostResponse } from '../../lib/types';
import { ImageList, ImageListItem, Modal } from '@mui/material';
import Post from '../postcomponents/Post';
import { useAuthentication } from '../../contexts/AuthenticationContext';
import { getFavoritesOfUser, getPostsOfUser } from '../../lib/ApiCalls/PostApiCalls';

export default function PostDisplay({ userId, saved = false }: {userId:number, saved?: boolean }) {
  const [posts, setPosts] = useState<PostResponse[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState<PostResponse>();

  const { user } = useAuthentication();

  /**
   * Load posts of user / favorites of user
   * @returns PostREsponse[]
   */

  useEffect(() => {
    async function load() {
      let res;
      if (saved) {
        res = await getFavoritesOfUser(userId);
      } else {
        res = await getPostsOfUser(userId);
      }
      if (res) {
        setPosts(res);
      }

    }
    load();
  }, [userId]);


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
