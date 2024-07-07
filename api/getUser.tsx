import { formatDate } from "@/helper/format";
import Account from "@/types/Account";

export default async function getUser(handle: string): Promise<Account> {
    const match = /^@?([^@\/\\\?&=]+)@([^@\/\\\?&=]+)$/.exec(handle);
    if (!match) throw new TypeError("Invalid handle");
    const [_, localName, domain] = match;

    let url: any = await fetch("https://" + domain + "/.well-known/webfinger?resource=acct:" + localName + "@" + domain);
    url = await url.json() as any;
    console.log(url);
    url = url.links?.find(x => x.rel.includes("://webfinger.net/rel/profile-page")).href as string;
    console.log(url);
        
    let data: any = await fetch(url, 
        { headers: { Accept: 'application/ld+json; profile="https://www.w3.org/ns/activitystreams"' } }
    );
    data = await data.json();
    console.log(data);

    let result = convertUser(data);
    result.handle = "@" + localName + "@" + handle;
    result.url = url;

    return result;
}

export function convertUser(data: any): Account {
    let result = {
        displayName: data.name,
        profileImageUrl: data.icon.url,
        profileBannerUrl: data.image.url,
        description: data.summary,
        
        creationDate: data.published ? new Date(data.published) : undefined,

        extraInfo: [],
        links: [],
        feeds: {},
    } as Account;
    
    if (data["vcard:bday"]) result.extraInfo!.push({ title: "Birthdate", content: formatDate(new Date(data["vcard:bday"])) });
    if (data["vcard:Address"]) result.extraInfo!.push({ title: "Address", content: data["vcard:Address"] });
    
    for (let att of (data.attachment ?? [])) result[/<a( [^>]+)? href=([^>]+)?>/.test(att.value) ? "links" : "extraInfo"]!.push({ title: att.name, content: att.value });

    if (data.outbox) result.feeds!.accountTimeline = { api: "activitypub", endpoint: data.outbox };
    if (data.featured) result.feeds!.accountPinned = { api: "activitypub", endpoint: data.featured };
    if (data.following) result.feeds!.accountFollowing = { api: "activitypub", endpoint: data.following };
    if (data.followers) result.feeds!.accountFollowers = { api: "activitypub", endpoint: data.followers };
    
    return result;
}