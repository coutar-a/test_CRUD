const uniqid = require("uniqid")

module.exports = (knex) => ({
    getPlayer: (playerId) => knex("players").where({id: playerId}).whereNull("deletedAt").first(),
    getPlayers: () => knex("players").whereNull("deletedAt"),
    updatePlayer: (playerId, payload) => knex("players").where("id", playerId).whereNull("deletedAt").update(payload),
    createPlayer: async (payload) => {
        const playerAlreadyExists = knex("players").where(payload).first()

        return playerAlreadyExists ? playerAlreadyExists.id : knex("players").insert(Object.assign(payload, {id: uniqid()}))
    },
    deletePlayer: (playerId) => knex("players").where({id: playerId}).update("deletedAt", knex.fn.now())
});