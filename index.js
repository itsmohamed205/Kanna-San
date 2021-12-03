const { Client, Collection, MessageEmbed } = require("discord.js");
const { DisTube } = require("distube")
const client = new Client({
    intents: 32767,
});
let {OP} = require("opmongo");

 const { SpotifyPlugin } = require("@distube/spotify")
//console.log(SpotifyPlugin)
const music = new DisTube(client, {
    emitNewSongOnly: true,
    plugins: [new SpotifyPlugin()]
})

module.exports = client;
// Global Variables
client.distube = music;
client.commands = new Collection();
client.cooldowns = new Collection();
client.slashCommands = new Collection();
client.aliases = new Collection();
client.config = require("./config.json");
client.emotes = client.config.emoji
client.db = new OP(client.config.mongodburl);

// Initializing the project
require("./handler")(client);


client.login(client.config.token);