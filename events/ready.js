const client = require("../index");
const {MessageEmbed} = require("discord.js")

client.on("ready", async () => {
  
  const botactivities = [
    {
text: 'Kanna Rain Dance 4K',
type: "STREAMING",
URL: "https://discord.io/anami"
    },
    {
text: "with Saikawa",
type: "PLAYING",
URL: "https://discord.io/anami"
    },
    {
text: "the Televison with Saikawa",
type: "WATCHING",
URL: "https://discord.io/anami"
    },
    {
text: "to Saikawa's screams",
type: "LISTENING",
url: "https://discord.io/anami"
    },
    {
text: `with ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users`,
type: "STREAMING",
URL: "https://discord.io/anami"
    },
    {
text: `https://discord.io/anami`,
type: "STREAMING",
URL: "https://discord.io/anami"
    },
    {
      text: "ping for help",
      type: "PLAYING",
      URL: "https://discord.io/anami"
    }
];
console.log(`${client.user.tag} Is Online Saikawa :)`)
  let allMembers = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.members.cache.forEach((member) => {
      allMembers.add(member.user.id);
    });
  });

  let allChannels = new Set();
  client.guilds.cache.forEach((guild) => {
    guild.channels.cache.forEach((channel) => {
      allChannels.add(channel.id);
    });
  });

  try{
    const embed = new MessageEmbed()
    .setColor("#2c2f33")
    .setDescription(`${client.emotes.success} | **The System is successfully online Saikawa!**\nServers: **\`${client.guilds.cache.size}\`**\nCached Users: **\`${allMembers.size}\`**\nPing: \`${client.ws.ping}\``)
    .setTimestamp()
    .setFooter("Boot Up Date");
   const home = await client.guilds.cache.get("874941747778707457")
   const channel = await home.channels.cache.get("913203653345681438")
   await channel.send({ embeds: [embed] })

  } catch (e) {console.log(e)}

  console.log(`${client.guilds.cache.size} Servers\n` + `${client.channels.cache.size} Channels\n` + `${allMembers.size} Members`);
setInterval(() => {

const randomIndex = Math.floor(Math.random() * botactivities.length);

const activity = botactivities[randomIndex];
    client.user.setActivity(activity.text, { type: activity.type, url: activity.URL});
  }, 10000);
});
 
