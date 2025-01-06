const {
  MessageEmbed,
  MessageButton,
  MessageActionRow
} = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  cooldown: 2,
  description: "Shows the bot help list",

  run: async (client, message, args) => {

    const buttons = new MessageActionRow().addComponents(
      new MessageButton()
      .setURL("")
      .setStyle("LINK")
      .setLabel("SERVER")
      .setEmoji("")
    )
    let prefix;
    prefix = await client.db.get(`prefix_${message.guild.id}`);
    if (!prefix) prefix = client.config.prefix;
    const helpbuttons = new MessageActionRow().addComponents(
      new MessageButton()
      .setLabel("Invite")
      .setStyle("LINK")
      .setURL(""),

      new MessageButton()
      .setLabel("DM Help")
      .setStyle("SUCCESS")
      .setCustomId("todmhelp")
    )
    const help = new MessageEmbed()
      .setColor(client.config.embed)
      .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`1.21\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache.size}\`**`)
      .setThumbnail(client.user.avatarURL)
      .addField("**<:MikuMusic:> Music**:", `\`\`\`js\n"play": Play music based on the provided text/url\n "stop": Clear the queue and leave the vc\n"volume": sets the queue volume\n"nowplaying": shows the current active song/music\n"skip": skips the song and remove it\n"pause": pause the queue\n"resume": resume the queue\n"loop": turns on the loop mode\n\`\`\``)
    let msghelp;
    msghelp = await message.channel.send({
      embeds: [help],
      components: [helpbuttons]
    })
    let doneonce;
    doneonce = `false_${message.author.id}`
    const collector = await msghelp.createMessageComponentCollector({
      componentType: 'BUTTON',
      time: 15000
    });
    collector.on("collect", async button => {
      console.log(button)
      if (button.customId === "todmhelp") {
        if (button.user.id !== message.author.id) return button.reply({
          content: "Kobayashi said only who triggered the command can use it",
          ephermal: true
        })
        const helpdmmsg = new MessageEmbed()
          .setColor(client.config.embed)
          .setDescription(`**Prefix**: **\`${prefix}\`**\n**Version**: **\`1.21\`**\n**Ping**: **\`${client.ws.ping}\`**\n**Servers Count**: **\`${client.guilds.cache}\`**`)
          .addField("**Commands**:", "play, stop, volume, queue, help, ping, skip")
        let helpbutton = new MessageActionRow().addComponents(
          new MessageButton()
          .setLabel("Invite")
          .setStyle("LINK")
          .setURL(""),

        )

        try {
          await msghelp.delete()
          const user = await button.guild.members.cache.get(button.user.id)
          await user.send({
            embeds: [help],
            components: [helpbutton]
          })
        } catch (e) {
          if (doneonce === `true_${button.user.id}` && doneonce === undefined) return
          doneonce = `true_${button.author.id}`
          message.channel.send(`Sorry <@!${button.user.id}>, i couldn't direct message you`)
        }

      }
    })
    collector.on("end", async button => {
      try {
        await button.update({
          components: [helpbutton]
        })
      } catch (e) {
        return
      }
    })
  },
}