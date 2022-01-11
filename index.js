const { Client, Collection, MessageEmbed } = require("discord.js");
const { DisTube } = require("distube")
const client = new Client({
    intents: 32767,
});
let {OP} = require("opmongo");
const ytdl = require('ytdl-core');
const HttpsProxyAgent = require('https-proxy-agent');

const proxy = 'http://kanna:sweetie1@111.111.111.111:8080';
const agent = HttpsProxyAgent(proxy);

const stream = ytdl('https://www.youtube.com/watch?v=aqz-KE-bpKQ', {
  requestOptions: { agent },
});

console.log('Starting Download');

stream.on('data', chunk => {
  console.log('downloaded', chunk.length);
});

stream.on('error', err => {
  console.error(err);
});

stream.on('end', () => {
  console.log('Finished');
});
 const { SpotifyPlugin } = require("@distube/spotify")
//console.log(SpotifyPlugin)
const music = new DisTube(client, {
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    youtubeCookie: "AIzaSyAc3yjCvzAGjKZoAKNSjiOWMDhfZbF_7Wg",
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