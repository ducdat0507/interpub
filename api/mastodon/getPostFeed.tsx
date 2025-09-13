import { formatDate } from "@/helper/format";
import Account, { FeedInfo } from "@/types/Account";
import Post from "@/types/Post";
import PostFeed from "@/types/PostFeed";
import { convertAccount } from "./getAccount";
import * as NodeEmoji from "node-emoji";

export default async function getPostFeed(feed: FeedInfo, domain: string): Promise<PostFeed> {

    let result = {
        posts: [],
        nextUrl: feed.endpoint,
        busy: false,
        getNext() {
            console.log(this.nextUrl);
            if (this.busy || !this.nextUrl) return;
            this.busy = true;
            return fetch(this.nextUrl).then(x => {
                this.nextUrl = /\<([^\>]+)>; rel="next"/.exec(x.headers.get("Link") ?? "")?.[1];
                return x.json();
            }).then(posts => {
                console.log(posts);
                this.posts.push(...posts.map((post: any) => convertPost(post, domain)));
                this.busy = false;
                this.onUpdate?.(this.posts);
            });
        },
        getPrevious() {
            if (this.busy || !this.previousUrl) return;
            this.busy = true;
            return fetch(this.previousUrl).then(x => {
                this.previousUrl = /\<([^\>]+)>; rel="prev"/.exec(x.headers.get("Link") ?? "")?.[1];
                return x.json();
            }).then(posts => {
                this.posts.unshift(...posts.map((post: any) => convertPost(post, domain)));
                this.busy = false;
                this.onUpdate?.(this.posts);
            });
        },
    } as PostFeed;

    return result;
}

export function convertPost(data: any, domain: string): Post {

    let main = data.reblog ?? data;

    let result = {
        author: convertAccount(main.account, domain),
        createdAt: new Date(data.created_at),
        body: main.content,
        attachments: main.media_attachments?.map(x => ({
            type: x.type,
            previewUrl: x.preview_url,
            url: x.remote_url ?? x.url
        })) || [],
        starCount: main.favourites_count,
        boostCount: main.reblogs_count,
        replyCount: main.replies_count,
    } as Post;

    (result.author as Account).handle = "@" + main.account.acct + (main.account.acct.indexOf("@") < 0 ? "@" + domain : "");

    if (main.reactions) {
        result.reactions = main.reactions.map(reaction => ({
            emoji: reaction.url ? {
                name: reaction.name,
                imageUrl: reaction.url,
                imageRatio: 1,
            } : {
                name: NodeEmoji.find(reaction.name)?.emoji,
                unicode: reaction.name
            },
            count: reaction.count
        }));
    }

    if (data.reblog) {
        result.boostData = {
            boostedBy: convertAccount(data.account, domain),
        }
    }

    return result;
}