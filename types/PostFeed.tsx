import Post from "./Post";

type PostFeed = {
    posts: Post[],

    busy: boolean,
    onUpdate: () => void;

    nextUrl: string,
    getNext: () => Promise<Post[]>,
}

export default PostFeed;