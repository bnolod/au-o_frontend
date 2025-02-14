import { useCommentBoard } from "../contexts/CommentContext";
import CommentBoard from "../components/commentboard/CommentBoard";
import Header from "../components/Header";
import Post from "../components/postcomponents/Post";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { useEffect, useState } from "react";
import { PostResponse } from "../lib/types";
import { apiFetch } from "../lib/apiClient";


export default function MainPage() {

  const {user} = useAuthentication();

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


  const {isOpen} = useCommentBoard();
  return (
    <div className="bg-backgroundGradient bg-fixed min-h-screen flex flex-col text-textColor">
      <Header />
      <main className="flex flex-col md:flex-row h-full items-center md:items-start justify-center pt-20">
        <div className=" md:w-3/12 fixed left-0 bg-cyan-50">Bal oldali aside</div>
        <div className="w-11/12 md:w-5/12 flex flex-col">
        {posts.map((post) => (
            <Post {...post}/>
          ))}
        </div>
        <div className={"md:w-3/12 w-11/12 right-4 items-start " + (!isOpen ? "hidden" : "fixed flex")}>
        <CommentBoard/>
        </div>
      </main>
    </div>
  );
}
