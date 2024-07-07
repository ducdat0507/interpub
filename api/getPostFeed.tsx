import { formatDate } from "@/helper/format";
import Account from "@/types/Account";
import PostFeed from "@/types/PostFeed";

export default async function getPostFeed(url: string): Promise<PostFeed> {
    console.log(url);

    let data: any = await fetch(url, 
        { headers: { Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"' } }
    );
    data = await data.json();
    console.log(data);

    let result = {
        posts: [],
        nextUrl: data.first,
        busy: false,
        getNext() {
            if (this.busy) return;
            this.busy = true;
            return fetch(this.nextUrl, 
                { headers: { Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"' } }
            ).then(x => x.json()).then(x => {
                console.log(x);
                this.nextUrl = x.next,
                this.posts.push(...x.orderedItems);
                this.busy = false;
                this.onUpdate?.();
            });
        }
    } as PostFeed;

    return result;
}