import { expect, describe, it } from '@jest/globals';
import request from 'supertest';
import app from '..';

describe('Basic CRUD operations', () => {
  it('should return 404 for unknown routes', async () => {
    const response = await request(app).get('/test');
    expect(response.status).toBe(404);
  });

  it('should return 500 for internal server error', async () => {
    const response = await request(app).delete('/reviews/1');
    expect(response.status).toBe(500);
  });

  it('should return 200 for GET /authors', async () => {
    const response = await request(app).get('/authors');
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual([]);
  });

  it('should return 200 for GET /reviews', async () => {
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual([]);
  });

  it('should return 200 for GET /reviews/:id', async () => {
    const response = await request(app).get('/reviews/5');
    expect(response.status).toBe(200);
    expect(response.body).not.toEqual({});
    expect(response.body.id).toBe(5);
    expect(response.body.rating).toBe(3);
  });
});
