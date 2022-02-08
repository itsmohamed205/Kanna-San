const {
    MessageEmbed
} = require("discord.js")
const {
    ErrorMessage
} = require("../../fc")
const {
    joinVoiceChannel
} = require('@discordjs/voice');

module.exports = {
    name: "resume",
    aliases: ["play"],
    cooldown: 2,
    description: "resume the queue",
    permissions: [],

    run: async (client, message, args) => {
        try {
            if (!args[0] && args[0] === undefined) {
                const novc = new MessageEmbed()
                    .setDescription(`${client.emotes.error} | You are not connected to a VC`)
                    .setColor(client.config.embed);
                const member = await message.guild.members.cache.get(message.author.id);
                if (!member.voice.channelId || member.voice.channelId === null) return message.channel.send({
                    embeds: [novc]
                })
                const {
                    joinVoiceChannel
                } = require('@discordjs/voice');

                const connection = await joinVoiceChannel({
                    channelId: member.voice.channelId,
                    guildId: member.guild.id,
                    adapterCreator: member.guild.voiceAdapterCreator,
                })
                const me = await message.guild.members.cache.get(client.user.id)

                if (me.voice.channelId !== null) {
                    const newchannel = await message.guild.channels.cache.get(me.voice.channelId)
                    const difvc = new MessageEmbed()
                        .setDescription(`${client.emotes.play} | Switched Channels To ${newchannel.name}`)
                        .setColor(client.config.embed);
                    if (member.voice.channelId !== me.voice.channelId) return message.channel.send({
                        embeds: [difvc]
                    });
                }
                const queue = client.distube.getQueue(message)
                const noqu = new MessageEmbed()
                    .setDescription(`${client.emotes.error} | There is nothing to play, what about adding some?`)
                    .setColor(client.config.embed);
                if (!queue) return message.channel.send({
                    embeds: [noqu]
                })
                const done = new MessageEmbed()
                    .setDescription(`${client.emotes.play} | Resumed The Queue!`)
                    .setColor(client.config.embed);
                try {
                    await queue.resume()
                } catch (e) {
                    return
                }
                message.channel.send({
                    embeds: [done]
                })
            } else {
                return
            }
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}