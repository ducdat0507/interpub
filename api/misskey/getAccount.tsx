import Account from "@/types/Account";

export default async function getAccount(domain: string, handle: string): Promise<Account> {
    const match = /^@?([^@\/\\\?&=]+)@([^@\/\\\?&=]+)$/.exec(handle);   
    if (!match) throw new TypeError("Invalid handle");
    const [_, handleName, handleDomain] = match;

    let data: any = await fetch("https://" + domain + "/api/users/show", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            host: handleDomain,
            username: handleName,
        }),
    });
    data = await data.json() as any;

    let result = convertAccount(data, domain);
    result.handle = "@" + handleName + "@" + handleDomain;

    return result;
}

export function convertAccount(data: any, domain: string): Account {
    let result = {
        displayName: data.name || data.username,
        profileImageUrl: data.avatarUrl,
        profileBannerUrl: data.bannerUrl,
        description: data.description,
        
        creationDate: new Date(data.createdAt),

        extraInfo: [],
        links: [],
        feeds: {
            accountTimeline: ({ api: "misskey", endpoint: "https://" + domain + "/api/users/notes", postBody: {
                userId: data.id, withRenotes: true, withReplies: false, allowPartial:true
            } }),
            // accountPinned: { data:  },
            accountFollowers: { api: "misskey", endpoint: "https://" + domain + "/api/users/followers", postBody: {
                userId: data.id
            } },
            accountFollowing: { api: "misskey", endpoint: "https://" + domain + "/api/users/following", postBody: {
                userId: data.id
            } },
        },
    } as Account;

    if (data.fields) for (let att of (data.fields)) result[/<a( [^>]+)? href=([^>]+)?>/.test(att.value) ? "links" : "extraInfo"]!.push({ title: att.name, content: att.value });
    
    return result;
}