import Post from "../components/postcomponents/Post";
import { useEffect, useState } from "react";
import { PostResponse } from "../lib/types";
import { apiFetch } from "../lib/apiClient";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuthentication } from "../contexts/AuthenticationContext";

export default function MainPage() {
  const {language} = useLanguage();
  const {user} = useAuthentication()
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
  if (!user) return <p>loading</p>
  return (
    <>
      {posts.map((post) => (
        <Post user={user} language={language} post={post} />
      ))}
    </>
  );
}
