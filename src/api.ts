import * as express from "express";

const app = express();

app.post("/", (_req, res) => {
    res.json({ shortUrl: ''});
});

app.get("/", (_req, res) => {
    res.status(404);
});

export default app;
