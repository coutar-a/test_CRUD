const express = require("express");
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
const jwtMiddleware = require("express-jwt");

const app = express();

app.use(bodyParser.json());

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "db",
    user: "postgres",
    password: "password",
    database: "playercrud",
  },
});

const {
  getPlayer,
  getPlayers,
  createPlayer,
  deletePlayer,
  updatePlayer,
  getUser,
  createUser,
} = require("./db/getters")(knex);

const {
  playerCreationSchema,
  playerUpdateSchema,
} = require("./schemas/player");

const { userLoginSchema } = require("./schemas/user")

const secret = "this would be an actual secret in prod";

app.get("/", (req, res) => {
  res.status(200).send("OK");
});

app.get("/players", async (req, res) => {
  const data = await getPlayers();
  res.send({ data });
});

app.get("/player/:player", async (req, res) => {
  const data = await getPlayer(req.params.player);
  res.send({ data });
});

app.delete("/player/:player", jwtMiddleware({ secret, algorithms: ['RS256'] }), async (req, res) => {
  const data = await deletePlayer(req.body);
  res.send({ data });
});

app.put("/player/:player", jwtMiddleware({ secret, algorithms: ['RS256'] }), async (req, res) => {
  const { error } = playerUpdateSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const data = await updatePlayer(req.body);
  res.send({ data });
});

app.post("/player", jwtMiddleware({ secret, algorithms: ['RS256'] }), async (req, res) => {
  const { error } = playerCreationSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const data = await createPlayer(req.body);
  res.send({ data });
});

app.post("/user", async (req, res) => {
  const data = await createUser(req.body.username, req.body.password);
  res.send({ data });
});

app.post("/user/login", async (req, res) => {
  const { error } = userLoginSchema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  const user = await getUser(req.body.username, req.body.password);
  if (user) {
    const token = jwt.sign({ name: req.body.username }, secret);
    res.send({ token });
    return;
  }
  res.status(400).json({ error: "Invalid credentials" });
});

module.exports = app;
