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
                .setDescription(`${client.emotes.error} | There is nothing to play, what about adding some?`)
                .setColor(client.config.embed);

            if (!queue) return message.channel.send({
                embeds: [noqu]
            });

            const volume = parseInt(args[0])
            const numberv = new MessageEmbed()
                .setDescription(`${client.emotes.error} | Please enter a valid number [1-150]`)
                .setColor(client.config.embed);

            if (isNaN(volume) || volume > 150 || volume < 0) return message.channel.send({
                embeds: [numberv]
            })
const text = [
    "i hate caffein...",
    "hearing loud music for too long may affect your ears",
    "i just saw someone pervert trying to flirt with me",
    "is there something else i can help you with?",
    "music helps to meditate actually",
    "my developer suffered from depression when he wrote these codes",
    "if you have a bad mood evade sad music",
    "my owner wishes you a great time!"
]
const randomindx = Math.floor(Math.random() * text.length)
            const done = new MessageEmbed()
                .setDescription(`${client.emotes.success} | Set volume from \`${queue.volume}\` to \`${volume}\`, ${text[randomindx]}`)
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