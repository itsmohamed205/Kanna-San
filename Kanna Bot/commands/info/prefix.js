const { MessageEmbed } = require("discord.js")
const client = require("../../index")
const { ErrorMessage } = require("../../fc")


module.exports = {
    name: "prefix",
    description: "changes the server prefix for the bot",
    cooldown: 30,
    permissions: ["ADMINISTRATOR"],
    aliases: ["No aliases"],

run: async (client, message, args) => {
    try{
const Error = new MessageEmbed()
.setDescription(`${client.emotes.error} | You need to enter a valid prefix`)
.setColor(client.config.embed)
    if(!args[0] || args[0].length > 3)return message.channel.send({ embeds: [Error] })
    await client.db.set(`prefix_${message.guild.id}`, args[0])
    const success = new MessageEmbed()
    .setDescription(`${client.emotes.success} | \`${args[0]}\` is added as a new prefix successfully`)
    .setColor(client.config.embed);
    message.channel.send({ embeds: [success] })
    } catch (e) {ErrorMessage(message, e)}
}
}