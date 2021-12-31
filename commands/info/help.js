const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown : 2,
  description: "Shows the bot help list",

  run: async (client, message, args) => {
    
    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
      .setURL("https://discord.io/anami")
      .setStyle("LINK")
     .setLabel("SERVER") 
     .setEmoji("888830034574475325")
    )
    let prefix;
   prefix = await client.db.get(`prefix_${message.guild.id}`);
    if(!prefix)prefix = client.config.prefix;

 const help =  new MessageEmbed()
.setColor(client.config.embed)
 .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`1.21\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache}\`**`)
    .addField("**Commands**:", "play, stop, volume, queue, help, ping, skip")
  message.channel.send({ embeds: [help], components: [buttons]})
  },
}

