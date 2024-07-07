import { FeedType } from "./Enums";

type Account = {
    displayName?: string,
    url?: string,
    handle?: string,
    profileImageUrl?: string,
    profileBannerUrl?: string,
    description?: string,
    creationDate?: Date,

    followerCount?: number,
    followingCount?: number,
    postCount?: number,

    links?: {
        title: string,
        content: string,
    }[],
    extraInfo?: {
        title: string,
        content: string,
    }[],
    feeds?: {
        [feedType in FeedType]?: {
            api: string,
            endpoint: string,
        }
    },
}

export default Account;