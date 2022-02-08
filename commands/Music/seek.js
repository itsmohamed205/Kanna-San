const {
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require("discord.js")
const {
    ErrorMessage
} = require("../../fc")
const {
    joinVoiceChannel
} = require('@discordjs/voice');
const format = require("format-duration")
module.exports = {
    name: "seek",
    aliases: ["seekto"],
    cooldown: 2,
    permissions: [],
    description: "seeks to the specified time",

    run: async (client, message, args) => {
        try {

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
            const endoflist = new MessageEmbed()
                .setDescription(`${client.emotes.error} | Enter a valid time to seek to`)
                .setColor(client.config.embed);

            const time = Number(args[0])
            if (!args[0]) return message.channel.send({
                embeds: [endoflist]
            })
            try {
                queue.seek(time)
            } catch (e) {
                return message.channel.send({
                    embeds: [endoflist]
                })
            }
            const newtime = format(time * 1000)
            const done = new MessageEmbed()
                .setDescription(`${client.emotes.success} | Seeked to ${newtime} as wanted!`)
                .setColor(client.config.embed);
            message.channel.send({
                embeds: [done]
            })

        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}