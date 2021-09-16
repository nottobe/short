import * as express from "express";
import { nanoid } from 'nanoid';

const BASE_URL = 'tier.app';

const SHORT_URLS = new Map();

const app = express();

app.use(express.json());

app.post("/", (req, res) => {
    if(req.body?.url) {
        const id = nanoid();
        SHORT_URLS.set(id, req.body?.url);
        res.json({ shortUrl: `${req.protocol}://${BASE_URL}/${id}` });
    } else {
        res.sendStatus(400);
    }
});

app.get("/*", (req, res) => {
    const id = req.path.replace('/', '');

    if (SHORT_URLS.has(id)) {
        return res.redirect(301 , SHORT_URLS.get(id));
    }
    res.sendStatus(404);
});

export default app;
