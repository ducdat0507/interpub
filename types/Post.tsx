import Account from "./Account";

type Post = {
    author: string | Account,
    body: string,
}

export default Post;