import { formatDate } from "@/helper/format";
import Account from "@/types/Account";
import Post from "@/types/Post";
import PostFeed from "@/types/PostFeed";

export default async function getPostFeed(url: string): Promise<PostFeed> {
    // console.log(url);

    let data: any = await fetch(url, 
        { headers: { Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"' } }
    );
    data = await data.json();
    // console.log(data);

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
                this.nextUrl = x.next;
                let posts = {};
                let currentId = 0;
                let currentId2 = 0;
                let nextId = 0;
                const fetchPost = () => {
                    // if (nextId >= 1) {
                    if (nextId >= x.orderedItems.length) {
                        return;
                    }
                    const id = nextId++;
                    fetch(x.orderedItems[id].id, 
                        { headers: { Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"' } }
                    ).then(x => x.json()).then(y => {
                        posts[id] = y;
                        onPostFetch();
                    }).catch((e) => {
                        posts[id] = {};
                        onPostFetch();
                    });
                }
                const onPostFetch = () => {
                    while (currentId < x.orderedItems.length) {
                        if (posts[currentId]) {
                            // console.log(JSON.stringify(posts[currentId], 2));
                            this.posts.push(convertPost(posts[currentId]))
                            fetchPost();
                            currentId++;
                        } else {
                            break;
                        }
                    }
                    if (currentId2 != currentId) {
                        currentId2 = currentId;
                        // console.log(currentId2, this.onUpdate);
                        this.onUpdate?.(this.posts);
                    }
                    if (currentId >= x.orderedItems.length) {
                        this.busy = false;
                    }
                }

                for (let a = 0; a < 5; a++) fetchPost();
            });
        }
    } as PostFeed;

    return result;
}

export function convertPost(data: any): Post {

    let result = {
        author: data.actor,
        body: data.content ?? data.object?.content,
        attachments: data.object?.attachment?.map(x => ({
            type: x.mediaType,
            url: x.url
        })) || [],
    } as Post;

    return result;
}