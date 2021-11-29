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
   .setAuthor("Ruka Chan Invite", "https://cdn.discordapp.com/emojis/865979625409609728.png?v=1&size=256")
   .setDescription("Ohayo Senpai, You can add me through this link: [Ruka Chan](https://dsc.gg/rukachan)🌺\nRuka Chan wishes you a good day💕")
   /*.setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")*/
   .setThumbnail(client.user.displayAvatarURL())
    .setTimestamp();

return interaction.editReply({ embeds: [invite] })
  
}}