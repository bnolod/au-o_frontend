import Post from "../components/postcomponents/Post";
import { useEffect, useState } from "react";
import { apiFetch } from "../lib/apiClient";
import { useLanguage } from "../contexts/LanguageContext";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { Post as PostEntity } from "../lib/entity/Post";

export default function MainPage() {
  const {language} = useLanguage();
  const {user} = useAuthentication()
  const [posts, setPosts] = useState<PostEntity[]>([]);

  async function fetchPosts(): Promise<PostEntity[]> {
    const post = await apiFetch<PostEntity[]>("posts/all", "GET", true);
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
        <Post preview={false} user={user} language={language} post={post} />
      ))}
    </>
  );
}
