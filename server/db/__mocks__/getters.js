module.exports = () => ({
    getPlayer: () => ({id: "1", name: "Jean Sport", number: 1, team: "Sportsville FC", deletedAt: null}),
    getPlayers: () =>[{id: "1", name: "Jean Sport", number: 1, team: "Sportsville FC", deletedAt: null}],
    updatePlayer: (playerId, payload) => ({id: "1", name: "Jack Sport", number: 1, team: "Sportsville FC", deletedAt: null}),
    createPlayer: (payload) => ({id: "2", name: "John Sport", number: 2, team: "Sportsville FC", deletedAt: null}),
    deletePlayer: (playerId) => ({id: "1", name: "Jean Sport", number: 1, team: "Sportsville FC", deletedAt: "2017-03-18T08:21:36.175627"}),
    getUser: () => ({id: "1", name: "Jean Sport", passwordHash: "honk"}),
    createUser: () => ({id: "1", name: "Jean Sport", passwordHash: "honk"}),
});