import { useEffect, useState } from "react";
import { apiFetch } from "../../lib/apiClient";
import Card from "../Card";
import { PostResponse } from "../../lib/types";
import { ImageList, ImageListItem } from "@mui/material";

export default function PostDisplay({ userId }: { userId: number }) {
  const [posts, setPosts] = useState<PostResponse[]>([]);

  useEffect(() => {
    async function load() {
      const res = await apiFetch<PostResponse[]>(`users/user/${userId}/posts`);
      if (res && res.data) {
        setPosts(res.data);
      }
    }
    load();
  }, []);

  console.log(posts[0]);

  return (
    <Card className="">
      {posts.length == 0 && <div className="text-center">jaj</div>}
      <ImageList variant="masonry" cols={2} gap={8}>
        {posts.map((post) => (
          <ImageListItem key={post.postId}>
            <img src={post.images[0].url} className="rounded-l"></img>
          </ImageListItem>
        ))}
      </ImageList>
    </Card>
  );
}
