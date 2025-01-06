const { MessageEmbed } = require("discord.js")

module.exports = {
  name: "server",
  description: "Shows Bot's Support Server",
  aliases: ["No aliases"],
  categories: "info",
  
  
run: async(client, interaction, args) => {
  const embed = new MessageEmbed()
  .setAuthor("Ruka Support Server", "")
  .setThumbnail("")
  .setDescription(`Need Support?! Found Bugs?!\nJoin Our Support Server For Bot Latest News & Support.
  
Link: [Ruka Chan Support](https://discord.gg/)
Owner Tag: \`Someone?\``)
  .setColor("#ff1ac6")
  .setFooter(`Serving ${client.guilds.cache.size} servers`)
  .setTimestamp()
 
interaction.editReply({ embeds: [embed] }) 
}
}