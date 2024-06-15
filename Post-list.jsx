import { useContext, useEffect } from "react";
import { PostList as PostListData } from "../store/Post-List-store";

const PostList = () => {
  const { postlist, addinitialposts } = useContext(PostListData);
  
  useEffect(() => {
    fetch("https://dummyjson.com/posts")
      .then((res) => res.json())
      .then((data) => {
        // Ensure reactions field has both likes and dislikes
        const formattedPosts = data.posts.map((post) => ({
          ...post,
          reactions: {
            likes: post.reactions.likes || 0,
            dislikes: post.reactions.dislikes || 0,
          },
          tags: post.tags || [],
        }));
        addinitialposts(formattedPosts);
      });
  }, []);

  return (
    <>
      {postlist.length === 0 && <WelcomeMessage />}
      {postlist.map((posts) => (
        <Post key={posts.id} posts={posts} />
      ))}
    </>
  );
};

export default PostList;
