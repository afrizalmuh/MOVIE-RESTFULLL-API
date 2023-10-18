import { Response } from "express";
import request from "supertest";
import { setupServer } from "../../server";

const app = setupServer();

describe('test movie controller', () => {
  describe('test create movie', () => {
    test('when create movie', async () => {
      const payload = {
        id: 1000,
        title: "avatar",
        description: "",
        rating: 9.6,
        image: "",
        created_at: "2023-08-09 10:56:31",
        updated_at: "2023-08-01 10:56:31"
      }

      const response = await request(app)
        .post("/Movies")
        .send(payload)
      if (response.status <= 300) {
        expect(response.status).toBe(201);
      } else {
        //when already exist data movie
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(403)
      }
    });
  });
  describe('test get all data movie', () => {
    test('get all data movie', async () => {
      const response = await request(app).get('/Movies')
      expect(response.status).toBe(200)
    });
  });
  describe('test get detail data movie', () => {
    test('get detail data movie', async () => {
      const movieId = 1000
      await request(app).get(`/Movies/${movieId}`).expect(200)
    });
    test('when return 500 and empty data movie', async () => {
      const movieId = 'movie3'
      await request(app).get(`/Movies/${movieId}`).expect(500)
    });
  });
  describe('test update movie', () => {
    test('when create movie', async () => {
      const movieId = 1000;
      const payload = {
        id: 999,
        title: "avatar",
        description: "",
        rating: 9.6,
        image: "",
        created_at: "2023-08-09 10:56:31",
        updated_at: "2023-08-01 10:56:31"
      }

      const response = await request(app)
        .patch(`/Movies/${movieId}`)
        .send(payload)
      if (response.status <= 300) {
        expect(response.status).toBe(200);
      } else {
        //when already exist data movie
        expect(response.status).toBe(400);
        expect(response.body.code).toBe(403)
      }
    });
  });
  describe('test delete data movie', () => {
    test('get detail data movie', async () => {
      const movieId = 999
      await request(app).delete(`/Movies/${movieId}`).expect(200)
    });
    test('when return 500 and empty data movie', async () => {
      const movieId = 'movie3'
      await request(app).delete(`/Movies/${movieId}`).expect(500)
    });
  });
})

