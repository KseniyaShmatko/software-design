import request from 'supertest';
import { app } from '../../core';
import start from '../../core';

let server: any;

beforeAll(async () => {
    server = await start();
});

afterAll((done: any) => {
    server.close(done);
});

describe('Movie API Endpoints', () => {

    it('should fetch all movies and a movie by name', async () => {
        const [allMoviesRes, avatarMovieRes] = await Promise.all([
            request(app).get('/api/movie'),
            request(app).get('/api/movie/name/Avatar')
        ]);

        expect(allMoviesRes.status).toEqual(200);
        expect(allMoviesRes.body).toBeDefined();

        expect(avatarMovieRes.status).toEqual(200);
        expect(avatarMovieRes.body).toBeDefined();
    });

    it('should fetch a movie by ID along with its comments and user mark', async () => {
        const [movieRes, commentsRes, userMarkRes] = await Promise.all([
            request(app).get('/api/movie/1'),
            request(app).get('/api/comment/movie/1'),
            request(app).get('/api/movieuser/movie/1')
        ]);

        expect(movieRes.status).toEqual(200);
        expect(movieRes.body).toBeDefined();

        expect(commentsRes.status).toEqual(200);
        expect(commentsRes.body).toBeDefined();

        expect(userMarkRes.status).toEqual(200);
        expect(userMarkRes.body).toBeDefined();
    });

});
