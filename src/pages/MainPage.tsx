import { useCommentBoard } from "../contexts/CommentContext";
import CommentBoard from "../components/commentboard/CommentBoard";
import Header from "../components/Header";
import Post from "../components/postcomponents/Post";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { useEffect, useState } from "react";
import { PostResponse } from "../lib/types";
import { apiFetch } from "../lib/apiClient";
import LeftAside from "../components/leftnavigation/LeftNavigation";

export default function MainPage() {
  const { user } = useAuthentication();

  const [posts, setPosts] = useState<PostResponse[]>([]);

  async function fetchPosts(): Promise<PostResponse[]> {
    const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
    console.log(post);
    return post?.data!;
  }
  useEffect(() => {
    async function load() {
      setPosts(await fetchPosts());
    }
    load();
  }, []);

  const { isOpen } = useCommentBoard();
  return (
    <>
      {posts.map((post) => (
        <Post {...post} />
      ))}
    </>
  );
}
