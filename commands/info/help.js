const { MessageEmbed, MessageButton, MessageActionRow } = require("discord.js");

//const { readdirSync } = require("fs");


module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown : 3,
  description: "Shows the bot help list",
  usage: "[command]&[categorie]",

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
 .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`2.1\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache}\`**`)
    .addField("**Commands**:", "play, stop, volume, queue, help, ping, skip")
  message.channel.send({ embeds: [help], components: [buttons]})
  },
}

