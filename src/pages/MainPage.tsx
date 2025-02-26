import Post from "../components/postcomponents/Post";
import { useEffect, useState } from "react";
import { PostResponse } from "../lib/types";
import { apiFetch } from "../lib/apiClient";

export default function MainPage() {

  const [posts, setPosts] = useState<PostResponse[]>([]);

  async function fetchPosts(): Promise<PostResponse[]> {
    const post = await apiFetch<PostResponse[]>("posts/all", "GET", true);
    if (post && post.data) {
      return post.data;
    }
    else return []
  }
  useEffect(() => {
    async function load() {
      setPosts(await fetchPosts());
    }
    load();
  }, []);

  return (
    <>
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
}
