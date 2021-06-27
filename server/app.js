const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const knex = require("knex")({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    user: "postgres",
    password: "password",
    database: "playerCRUD",
  },
});

const { getPlayer, getPlayers, createPlayer, deletePlayer, updatePlayer } =
  require("./db/getters")(knex);

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

app.delete("/player/:player", async (req, res) => {
  const data = await deletePlayer(req.body);
  res.send({ data });
});

app.put("/player/:player", async (req, res) => {
  const data = await updatePlayer(req.body);
  res.send({ data });
});

app.post("/player", async (req, res) => {
  const data = await createPlayer(req.body);
  res.send({ data });
});

module.exports = app;
