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
    emitAddSongWhenCreatingQueue: false,
    youtubeCookie: "VISITOR_INFO1_LIVE=CIf83EKZvWk; PREF=tz=Africa.Cairo&f6=40000000; SID=FQhfQJ7jXpmC-w9HpmSUNsdLq9o4DSHHT5jIKqsTCr4GbIH5o1bROO5-DU_AmQCOQT7S8w.; __Secure-1PSID=FQhfQJ7jXpmC-w9HpmSUNsdLq9o4DSHHT5jIKqsTCr4GbIH5TP32L1FS5WIZobC_2Nqy3A.; __Secure-3PSID=FQhfQJ7jXpmC-w9HpmSUNsdLq9o4DSHHT5jIKqsTCr4GbIH5MAwxzxXPZZPU7ZFVy0VM6Q.; HSID=AnNA5x9fOCbJvp5wg; SSID=AcdXX8Bo8jIHxvJy_; APISID=NgxG9JI54aY-ZTRv/ARsc0rha1PGx_d7l8; SAPISID=jaGsjHH8f4foj3G9/AhTDF19xHNSXnu3L1; __Secure-1PAPISID=jaGsjHH8f4foj3G9/AhTDF19xHNSXnu3L1; __Se…ndCMllZYkNqRk9aSEtIaFBhU0hyaWtSYzFtbGxReGZpdllYZ0FnVFRWMGRrRDJ3SkNlSFg0RU9wQy1tR0o5Zy1FeExEdXR4eGNuQnItRW9CMUU2cWY5Ml9zNzFjWW95dXloU0JKaERZaThaZkd3UVV3; SIDCC=AJi4QfHIMHUtjK71WZLdBRtecZITiC4A8mIGzuzYxBX5At6O1AknQyq_gORSp4L4eCg8qXaz6sQ; __Secure-3PSIDCC=AJi4QfEBcX3wXqXI0ZV-5unIVWxOO_at30Bj3HdthAxbnnw9fYCn9-w9V56AJicK1xDrLJkSWf8; YSC=AmTAw6H6aSE; CONSISTENCY=AGDxDeM5UHKfvecBAAclUspZzHQYaQt-HwOXNe_QoD0UnraM6XMbfJWPk8fy7AHnXrTf_hXVDoSrl4GH4r0D9E9oSz9Gr_k2ihEtXglPrN6_n90bNtq8mJjQHmCITljRuapCsDzmB6vQUJ2eLmzej5c3",
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