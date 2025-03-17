import { useState, useEffect } from "react";
import { useAuthentication } from "../contexts/AuthenticationContext";
import { loadFeed } from "../lib/ApiCalls/PostApiCalls";
import { Post as PostEntity } from "../lib/entity/Post";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Navigate } from "react-router";
import Post from "../components/postcomponents/Post";


export default function PostsFeed() {
  const { user } = useAuthentication();
//   const { language } = useLanguage();
  const [refreshing, setRefreshing] = useState(false);
  const [timestamp, setTimestamp] = useState<string>(
    new Date(new Date(new Date().toISOString()).getTime() + 60 * 60 * 1000).toISOString().slice(0, -1) + '1234'
  );
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [posts, setPosts] = useState<PostEntity[]>([]);

  async function handleFetching(i: number) {
    setIsFetching(true);
    const res = await loadFeed(i, timestamp);

    if (res) {
      if (res.pageSize === 10) {
        //console.log("able to fetch next page");
        setCurrentPage(currentPage + 1);
      } else {
        //console.log("unable to fetch next page");
      }
      setPosts((prev) => [
        ...prev,
        ...res.content.filter((newPost) => !prev.some((post) => post.postId === newPost.postId)),
      ]);
    }
    setIsFetching(false);
  }

  async function fetchNextPage() {
    if (!isFetching) {
      //console.log("fetching page", currentPage + 1);
      await handleFetching(currentPage);
    }
  }

  const handleRefresh = () => {
    setRefreshing(true);
    setTimestamp(
      new Date(new Date(new Date().toISOString()).getTime() + 60 * 60 * 1000).toISOString().slice(0, -1) + '1234'
    );
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  useEffect(() => {
    async function load() {
      //console.log('loading');
      handleFetching(0);
      setCurrentPage(0);
    }
    load();
  }, [timestamp, refreshing]);
  if (user)
    return (
  
            <InfiniteScroll
            dataLength={posts.length} //This is important field to render the next data
            next={fetchNextPage}
            hasMore={true}
            loader={<h4></h4>}
            endMessage={
              <p style={{ textAlign: 'center' }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            // below props only if you need pull down functionality
            refreshFunction={handleRefresh}
            pullDownToRefresh
            pullDownToRefreshThreshold={50}
            pullDownToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
            }
            releaseToRefreshContent={
              <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
            }
          >
            {posts!.map(item => {
                        return <Post key={item.postId} user={user} post={item} language="HU"/>
            })}
          </InfiniteScroll>
    );
  else return <></>;
}
