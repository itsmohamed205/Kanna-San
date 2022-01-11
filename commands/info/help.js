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
const helpbuttons = new MessageActionRow().addComponents(
  new MessageButton()
  .setLabel("Invite")
  .setStyle("LINK")
  .setURL("https://discord.com/api/oauth2/authorize?client_id=692535884683411477&permissions=8&scope=bot%20applications.commands"),

  new MessageButton()
  .setLabel("DM Help")
  .setStyle("SUCCESS")
  .setCustomId("todmhelp")
)
 const help =  new MessageEmbed()
.setColor(client.config.embed)
 .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`1.21\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache.size}\`**`)
 .setThumbnail(client.user.avatarURL)
    .addField("**<:MikuMusic:916690228935266336> Music**:", `\`\`\`js\n"play": Play music based on the provided text/url\n "stop": Clear the queue and leave the vc\n"volume": sets the queue volume\n"nowplaying": shows the current active song/music\n"skip": skips the song and remove it\n"pause": pause the queue\n"resume": resume the queue\n"loop": turns on the loop mode\n\`\`\``)
  let msghelp;
  msghelp = await message.channel.send({ embeds: [help], components: [helpbuttons]})
  let doneonce;
  doneonce = `false_${message.author.id}`
  const collector = await msghelp.createMessageComponentCollector({
    componentType: 'BUTTON',
    time: 15000
});
  collector.on("collect", async button => {
    console.log(button)
    if(button.customId === "todmhelp") {
      if(button.user.id !== message.author.id)return button.reply({ content: "Kobayashi said only who triggered the command can use it", ephermal: true})
      const helpdmmsg =  new MessageEmbed()
.setColor(client.config.embed)
 .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`1.21\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache}\`**`)
    .addField("**Commands**:", "play, stop, volume, queue, help, ping, skip")
    let helpbutton = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL("https://discord.com/api/oauth2/authorize?client_id=692535884683411477&permissions=8&scope=bot%20applications.commands"),
    
    ) 
    
    try {
    await msghelp.delete()
    const user = await button.guild.members.cache.get(button.user.id)
    await user.send({embeds: [helpdmmsg], components: [helpbutton]})
    } catch(e) {
      if(doneonce === `true_${button.user.id}` && doneonce === undefined)return
      doneonce = `true_${button.author.id}`
      message.channel.send(`Sorry <@!${button.user.id}>, i couldn't direct message you`)}

    }
  })
  collector.on("end", async () => {
    try{
      await msghelp.edit({components: [helpbutton]})
     } catch(e) {return}
  })
  },
}


