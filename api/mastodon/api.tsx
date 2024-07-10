import { PubAPI } from "../getAPI";
import getAccount from "./getAccount";
import getPostFeed from "./getPostFeed";

export default async function api(domain: string): PubAPI {
    return {
        getAccount: (handle: string) => getAccount(domain, handle),
        getPostFeed: (url: string) => getPostFeed(url, domain),
    }
}