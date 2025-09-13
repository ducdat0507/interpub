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
        nextBody: feed.postBody,
        busy: false,
        getNext() {
            if (this.busy || !this.nextUrl) return;
            this.busy = true;
            return fetch(this.nextUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({... this.nextBody, limit: 20 }),
            }).then(x => {
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
    console.log(data);
    let main = data.renote ?? data;

    let result = {
        author: convertAccount(main.user, domain),
        createdAt: new Date(data.createdAt),
        body: main.text,
        attachments: main.files?.map(x => ({
            type: x.type,
            previewUrl: x.thumbnailUrl,
            url: x.url
        })) || [],
        starCount: 0,
        boostCount: main.replyCount,
        replyCount: main.renoteCount,
    } as Post;

    (result.author as Account).handle = "@" + main.user.username + "@" + (main.user.host ? main.user.host : domain);

    if (main.reactions) {
        result.reactions = Object.keys(main.reactions).map(reaction => ({
            emoji: {
                name: NodeEmoji.find(reaction)?.emoji ?? "?",
                unicode: reaction
            },
            count: main.reactions[reaction]
        }));
    }

    if (data.renote) {
        result.boostData = {
            boostedBy: convertAccount(data.user, domain),
        }
    }

    return result;
}