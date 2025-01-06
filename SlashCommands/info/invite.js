const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "invite",
  description: "Bot invite link",
  usage: "",
  aliases: [""],
  categories: "info",
  
run: (client, interaction, args) => {
const invite = new MessageEmbed()
   .setColor("#ff1ac6")
   .setFooter(`Serving ${client.guilds.cache.size} servers`)
   .setAuthor("Ruka Chan Invite", "")
   .setDescription("Ohayo Senpai, You can add me through this link: [Ruka Chan]()🌺\nRuka Chan wishes you a good day💕")
   /*.setImage("")*/
   .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp();

return interaction.editReply({ embeds: [invite] })
  
}}