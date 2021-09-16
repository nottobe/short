import { nanoid } from 'nanoid';

export class Repository {
    private static SHORT_URLS = new Map<string, {url: string, count: number}>();

    public static addUrl(url: string): string {
        const id = nanoid();
        Repository.SHORT_URLS.set(id, { count: 0, url });
        return id;
    }

    public static getUrl(id: string): string | undefined {
        let url = undefined;
        if (Repository.SHORT_URLS.has(id)) {
            const shortUrl = Repository.SHORT_URLS.get(id);
            url = shortUrl.url;

            shortUrl.count += 1;
            Repository.SHORT_URLS.set(id, shortUrl);
        }

        return url;
    }

    public static getCount(id: string): number | undefined {
        let count = undefined;
        if (Repository.SHORT_URLS.has(id)) {
            const shortUrl = Repository.SHORT_URLS.get(id);
            count = shortUrl.count
        }
        return count;
    }
};
