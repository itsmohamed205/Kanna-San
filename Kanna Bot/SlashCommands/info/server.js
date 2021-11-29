const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "server",
  description: "Shows Bot's Support Server",
  aliases: ["No aliases"],
  categories: "info",
  
  
run: async(client, interaction, args) => {
  const embed = new MessageEmbed()
  .setAuthor("Ruka Support Server", "https://cdn.discordapp.com/emojis/865979625409609728.png?v=1&size=256")
  .setThumbnail("https://media.discordapp.net/attachments/869657911528390656/881161688483762186/20210731_054332.png")
  .setDescription(`Need Support?! Found Bugs?!\nJoin Our Support Server For Bot Latest News & Support.
  
Link: [Ruka Chan Support](https://discord.gg/)
Owner Tag: \`Mohamed Amr#2005\``)
  .setColor("#ff1ac6")
  .setFooter(`Serving ${client.guilds.cache.size} servers`)
  .setTimestamp()
 
interaction.editReply({ embeds: [embed] }) 
}
}