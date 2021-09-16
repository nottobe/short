import * as request from 'supertest';

import { Repository } from './persistence';
import api from './api';

const URL_FORMAT_MATCH = /http:\/\/tier.app\/(.*)/;

describe('POST /', () => {
    it('requires url parameter', async () => {
        const response = await request(api)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({});
        expect(response.statusCode).toEqual(400);
    });
    it('generates short url', async () => {
        const response = await request(api)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({
                url: 'https://www.google.com',
            });
        expect(response.statusCode).toEqual(200);
        const body = JSON.parse(response.text);

        expect(body?.shortUrl).toMatch(URL_FORMAT_MATCH);
    });
});

describe('GET /', () => {
    it('returns 404 unknown', async () => {
        const response = await request(api).get('/unknown');
        expect(response.statusCode).toEqual(404);
    });

    it('returns 301 for created id', async () => {
        const createResponse = await request(api)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({
                url: 'https://www.google.com',
            });

        expect(createResponse.statusCode).toEqual(200);
        const body = JSON.parse(createResponse.text);

        const shortUrl = body?.shortUrl.match(URL_FORMAT_MATCH);
        expect(shortUrl.length).toBe(2);
        const id = shortUrl[1];

        const response = await request(api).get(`/${id}`);
        expect(response.statusCode).toEqual(301);
        expect(response.header?.location).toBe('https://www.google.com');
    });

    it('should increate visit count', async () => {
        const createResponse = await request(api)
            .post('/')
            .set('Content-Type', 'application/json')
            .send({
                url: 'https://www.google.com',
            });

        expect(createResponse.statusCode).toEqual(200);
        const body = JSON.parse(createResponse.text);

        const shortUrl = body?.shortUrl.match(URL_FORMAT_MATCH);
        expect(shortUrl.length).toBe(2);
        const id = shortUrl[1];

        const response = await request(api).get(`/${id}`);
        expect(response.statusCode).toEqual(301);
        expect(response.header?.location).toBe('https://www.google.com');

        const secondResponse = await request(api).get(`/${id}`);
        expect(response.statusCode).toEqual(301);
        expect(response.header?.location).toBe('https://www.google.com');

        expect(Repository.getCount(id)).toBe(2);
    });
});
