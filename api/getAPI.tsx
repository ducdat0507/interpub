import Account from "@/types/Account";
import MastodonAPI from "./mastodon/api";
import MisskeyAPI from "./misskey/api";
import PostFeed from "@/types/PostFeed";

export default async function getAPI(domain: string) {
    let url: any = await fetch("https://" + domain + "/.well-known/nodeinfo");
    url = await url.json() as any;

    
    let info: any = url.links?.find(x => x.rel.startsWith("http://nodeinfo.diaspora.software/ns/schema/2."))?.href;
    info = await fetch(info);
    info = await info.json() as any;

    if (!info.protocols.includes("activitypub")) {
        throw new Error("This is not an ActivityPub server");
    }

    switch (info.software.name.toLowerCase()) {
        case "mastodon":
            return MastodonAPI(domain);
        case "misskey":
            return MisskeyAPI(domain);
        default:
            throw new Error("Software not in supported list");
    }
}


export type PubAPI = {
    getAccount: (handle: string) => Promise<Account>,
    getPostFeed: (url: string) => Promise<PostFeed>,
}