const client = require("../index");
const {
  MessageEmbed
} = require("discord.js")

client.on("ready", async () => {

  console.log(`${client.user.tag} Is Online!`)
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

  try {
    const embed = new MessageEmbed()
      .setColor("RANDOM")
      .setDescription(`${client.emotes.lazy} | **The System is successfully online!**\n**Cached Servers**: \`${client.guilds.cache.size}\`\nCached Channels: \`${client.channels.cache.size}\`\n**Cached Users**: \`${allMembers.size}\`\nIntroducing: N/A | not released yet`)
      .setTimestamp()
      .setImage("https://media.discordapp.net/attachments/692555215299411989/940335415590805554/20220207_215549.gif")
      .setFooter({
        text: "Boot Up Time"
      });
    const home = await client.guilds.cache.get(client.config.channels.guild)
    const channel = await home.channels.cache.get(client.config.channels.bootup)
    await channel.send({
      embeds: [embed]
    })

  } catch (e) {
    console.log(e)
  }

  console.log(`${client.guilds.cache.size} Servers\n` + `${client.channels.cache.size} Channels\n` + `${allMembers.size} Members`);
  setInterval(() => {
    let botactivities = [{
        text: 'people smile',
        type: "WATCHING",
        URL: ""
      },
      {
        text: "ping for help",
        type: "PLAYING",
        URL: ""
      },
      {
        text: "the sky with happy smile",
        type: "WATCHING",
        URL: ""
      },
      {
        text: "people's laugh",
        type: "LISTENING",
        url: ""
      },
      {
        text: `with ${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} users`,
        type: "PLAYING",
        URL: ""
      },
    ];

    const randomIndex = Math.floor(Math.random() * botactivities.length);

    const activity = botactivities[randomIndex];
    client.user.setActivity(activity.text, {
      type: activity.type,
      url: activity.URL
    });
  }, 10000);
});