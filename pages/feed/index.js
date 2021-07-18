import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Snackbar from "../../components/common/Snackbar";
import Feed from "../../components/feed/Feed";
import PageLoading from "../../components/common/PageLoading";

const feed = () => {
  const router = useRouter();
  const { message } = router.query;

  const [feeds, setFeeds] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const fetchUserInfo = await fetch("/api/user");
      const userInfo = await fetchUserInfo.json();
      setUser(userInfo);

      const fetchFeedList = await fetch("/api/feed");
      const feedList = await fetchFeedList.json();
      setFeeds(feedList.data);
      setLoading(false);
    } catch (e) {
      console.error(e);
    }
  }

  if (loading) return <PageLoading />;
  return (
    <div>
      {feeds.map((feed, index) => (
        <Feed key={index} user={user} feed={feed} />
      ))}
      {message && <Snackbar retultMessage={message} durationProps={1400} />}
    </div>
  );
};

export default feed;
