import * as express from 'express';
import { Repository } from './persistence';

const BASE_URL = 'tier.app';

const SHORT_URLS = new Map();

const app = express();

app.use(express.json());

app.post('/', (req, res) => {
    if (req.body?.url) {
        const id = Repository.addUrl(req.body?.url);
        res.json({ shortUrl: `${req.protocol}://${BASE_URL}/${id}` });
    } else {
        res.sendStatus(400);
    }
});

app.get('/*', (req, res) => {
    const id = req.path.replace('/', '');
    const url = Repository.getUrl(id);

    if (url) {
        return res.redirect(301, url);
    }
    res.sendStatus(404);
});

export default app;
