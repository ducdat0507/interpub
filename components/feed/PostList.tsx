import PostFeed from "@/types/PostFeed";
import PostCard from "../card/PostCard";
import UserFeed from "./user/UserFeed";
import { useEffect, useReducer } from "react";
import TextBody from "../basic/TextBody";
import Post from "@/types/Post";
import { View } from "react-native";

type PostListArgs = {
  posts: Post[];
}

export default function PostList({posts}: PostListArgs) {
  return (
    <>
      {posts.map(x => <PostCard post={x} />)}
    </>
  );
}