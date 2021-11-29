const { MessageEmbed, MessageActionRow, MessageButton, Message } = require("discord.js")
const { ErrorMessage } = require("../../fc")
const client = require("../../index")
module.exports = {
  name: "invite",
  description: "Bot invite link",
  usage: "",
  aliases: ["in"],
  cooldown: "1",
  categories: "info",
  
run: (client, message, args) => {
  try{
    let prefix;
    prefix = client.db.get(`prefix_${message.guild.id}`)
    if(!prefix)prefix = client.config.prefix
    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
      .setEmoji("914641596526518343")
      .setStyle("LINK")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=692535884683411477&permissions=8&scope=bot%20applications.commands")
    )
const invite = new MessageEmbed()
   .setColor(client.config.embed)
   .setDescription(`Invite link is below Senpai!, thanks for using Kanna San✨`)
   .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp()

return message.channel.send({ embeds: [invite], components: [buttons] }) 
  } catch (e) { ErrorMessage(message, e)} 
}}