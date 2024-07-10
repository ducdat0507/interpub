import Post from "./Post";

type PostFeed = {
    posts: Post[],

    busy: boolean,
    onUpdate?: (posts: Post[]) => void;

    nextUrl?: string,
    getNext: () => Promise<void>,
    previousUrl?: string,
    getPrevious: () => Promise<void>,
}

export default PostFeed;