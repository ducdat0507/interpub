import Account from "@/types/Account";

export default async function getAccount(domain: string, handle: string): Promise<Account> {
    const match = /^@?([^@\/\\\?&=]+)@([^@\/\\\?&=]+)$/.exec(handle);
    if (!match) throw new TypeError("Invalid handle");
    const [_, handleName, handleDomain] = match;

    let data: any = await fetch("https://" + domain + "/api/v1/accounts/lookup?acct=" + handleName + "@" + handleDomain);
    data = await data.json() as any;

    let result = convertAccount(data, domain);
    result.handle = "@" + handleName + "@" + handleDomain;

    return result;
}

export function convertAccount(data: any, domain: string): Account {
    let result = {
        displayName: data.display_name,
        profileImageUrl: data.avatar,
        profileBannerUrl: data.header,
        description: data.note,
        
        creationDate: new Date(data.created_at),

        extraInfo: [],
        links: [],
        feeds: {
            accountTimeline: ({ api: "mastodon", endpoint: "https://" + domain + "/api/v1/accounts/" + data.id + "/statuses?exclude_replies=1" }),
            accountPinned: { api: "mastodon", endpoint: "https://" + domain + "/api/v1/accounts/" + data.id + "/statuses?pinned=1" },
            accountFollowers: { api: "mastodon", endpoint: "https://" + domain + "/api/v1/accounts/" + data.id + "/followers" },
            accountFollowing: { api: "mastodon", endpoint: "https://" + domain + "/api/v1/accounts/" + data.id + "/following" },
        },
    } as Account;

    for (let att of (data.fields)) result[/<a( [^>]+)? href=([^>]+)?>/.test(att.value) ? "links" : "extraInfo"]!.push({ title: att.name, content: att.value });
    
    return result;
}