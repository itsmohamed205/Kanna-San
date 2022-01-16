const client = require("../index");
const {
  MessageEmbed
} = require("discord.js")

client.on("ready", async () => {

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

  try {
    const embed = new MessageEmbed()
      .setColor(client.config.embed)
      .setDescription(`${client.emotes.lazy} | **The System is successfully online Saikawa!**\n**Servers**: \`${client.guilds.cache.size}\`\n**Cached Users**: \`${allMembers.size}\``)
      .setTimestamp()
      .setFooter("Boot Up Date");
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
        text: 'Tohru & Elma compete',
        type: "WATCHING",
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
        type: "PLAYING",
        URL: "https://discord.io/anami"
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