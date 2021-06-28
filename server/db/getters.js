const uniqid = require("uniqid");
const { createHash } = require("crypto");

module.exports = (knex) => ({
  getPlayer: (playerId) =>
    knex("players").where({ id: playerId }).whereNull("deletedAt").first(),
  getPlayers: () => knex("players").whereNull("deletedAt"),
  updatePlayer: (playerId, payload) =>
    knex("players")
      .where("id", playerId)
      .whereNull("deletedAt")
      .update(payload).returning("*"),
  createPlayer: async (payload) => {
    const playerAlreadyExists = await knex("players").where(payload).first();
    return playerAlreadyExists
      ? playerAlreadyExists
      : knex("players")
          .insert({ id: uniqid(), deletedAt: null, ...payload })
          .returning("*");
  },
  deletePlayer: (playerId) =>
    knex("players").where({ id: playerId }).update("deletedAt", knex.fn.now()).returning("*"),
  getUser: (username, password) => {
    // MD5 is not what I'd use in a prod env btw, this is just for the test
    const hash = createHash("md5").update(password).digest("hex");
    return knex("users").where({ name: username, passwordHash: hash }).first();
  },
  createUser: async (username, password) => {
    const hash = createHash("md5").update(password).digest("hex");
    const userAlreadyExists = await knex("users")
      .where({ name: username, passwordHash: hash })
      .first();
    return userAlreadyExists
      ? userAlreadyExists
      : knex("users")
          .insert({ id: uniqid(), name: username, passwordHash: hash })
          .returning("*");
  },
});
