const request = require("supertest");
const app = require("./app");
jest.mock("knex");
jest.mock("./db/getters");

describe("CRUD tests", () => {
  test("It should response the GET method", (done) => {
    request(app)
      .get("/")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("It should get all players", (done) => {
    request(app)
      .get("/players")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual(
          expect.arrayContaining([
            {
              id: "1",
              name: "Jean Sport",
              number: 1,
              team: "Sportsville FC",
              deletedAt: null,
            },
          ])
        );
        done();
      });
  });

  test("It should get a single player", (done) => {
    request(app)
      .get("/player/honk")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual({
          id: "1",
          name: "Jean Sport",
          number: 1,
          team: "Sportsville FC",
          deletedAt: null,
        });
        done();
      });
  });

  test("It should delete a player", (done) => {
    request(app)
      .delete("/player/honk")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual({
          id: "1",
          name: "Jean Sport",
          number: 1,
          team: "Sportsville FC",
          deletedAt: "2017-03-18T08:21:36.175627",
        });
        done();
      });
  });

  test("It should create a player", (done) => {
    request(app)
      .post("/player")
      .send({ name: "John Sport", number: 2, team: "Sportsville FC" })
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual({
          id: "2",
          name: "John Sport",
          number: 2,
          team: "Sportsville FC",
          deletedAt: null,
        });
        done();
      });
  });

  test("It should not create a player if the payload is invalid", (done) => {
    request(app)
      .post("/player")
      .send({ name: "John Sport", number: 2 })
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(400);
        done();
      });
  });

  test("It should update a player", (done) => {
    request(app)
      .put("/player/honk")
      .send({ name: "Jack Sport", number: 1, team: "Sportsville FC" })
      .set("Accept", "application/json")
      .then((response) => {
        expect(response.statusCode).toBe(200);
        expect(response.body.data).toEqual({
          id: "1",
          name: "Jack Sport",
          number: 1,
          team: "Sportsville FC",
          deletedAt: null,
        });
        done();
      });
  });
});
