const {
    MessageEmbed
} = require("discord.js");
const {
    joinVoiceChannel
} = require('@discordjs/voice');
const {
    ErrorMessage
} = require("../../fc")

module.exports = {
    name: "volume",
    aliases: ["vol"],
    description: "set the volume of the queue",
    cooldown: 2,
    permissions: [],

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
                .setDescription(`${client.emotes.error} | The queue is clean, Tohru cleaned it from a while`)
                .setColor(client.config.embed);

            if (!queue) return message.channel.send({
                embeds: [noqu]
            });

            const volume = parseInt(args[0])
            const numberv = new MessageEmbed()
                .setDescription(`${client.emotes.error} | Please enter a valid number [1-100]`)
                .setColor(client.config.embed);

            if (isNaN(volume) || volume > 100 || volume < 0) return message.channel.send({
                embeds: [numberv]
            })

            const done = new MessageEmbed()
                .setDescription(`${client.emotes.success} | Kobayashi set volume from \`${queue.volume}\` to \`${volume}\``)
                .setColor(client.config.embed);

            queue.setVolume(volume)
            message.channel.send({
                embeds: [done]
            })
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}