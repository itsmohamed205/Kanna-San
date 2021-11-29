const {MessageEmbed} = require("discord.js")
const {ErrorMessage} = require("../../fc")

module.exports = {
    name: "stop",
    aliases: ["leave", "disconnect"],
    cooldown: 1,
    description: "stops the bot",
    permissions: [],

run: async (client, message, args) => {
    try{
    const novc = new MessageEmbed()
        .setDescription(`${client.emotes.error} | You are not connected to a VC`)
        .setColor(client.config.embed);
    const member = await message.guild.members.cache.get(message.author.id);
    if(member.voice.channelId === null)return message.channel.send({ embeds: [novc]
    })
    const queue = client.distube.getQueue(message)
    const noqu = new MessageEmbed()
    .setDescription(`${client.emotes.error} | The queue is clean, Tohru cleaned it from a while`)
    .setColor(client.config.embed);
        if (!queue) return message.channel.send({ embeds: [noqu] })
        queue.stop()
        const done = new MessageEmbed()
        .setDescription(`${client.emotes.stop} | Tohru has just cleared the queue as you requested`)
        .setColor(client.config.embed);
        message.channel.send({ embeds: [done] })
} catch (e) {ErrorMessage(message, e)}
}
}