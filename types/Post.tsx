import Account from "./Account";
import Emoji from "./Emoji";

type Post = {
    author: string | Account,
    createdAt: Date,
    boostData: {
        boostedBy: string | Account,
    }

    body: string,

    attachments: {
        type: string,
        url: string,
    }[]

    starCount: number,
    boostCount: number,
    replyCount: number,
    reactions?: {
        emoji: Emoji,
        count: number,
    }[],
}

export default Post;