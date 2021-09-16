import api from "./api";
import * as request from "supertest";

describe("POST /", () => {
    it("generates short url", async () => {
        const response = await request(api).post('/');
        expect(response.text).toBe(JSON.stringify({ shortUrl: '' }));
        expect(response.statusCode).toEqual(200);
    });
});

describe("GET /", () => {
    it("returns 404 unknown", async () => {
        const response = await request(api).get('/unknown');
        expect(response.statusCode).toEqual(404);
    })
});
