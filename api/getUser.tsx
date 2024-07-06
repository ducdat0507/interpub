export default async function getUser(handle: string): Promise<object> {
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

    return data;
}