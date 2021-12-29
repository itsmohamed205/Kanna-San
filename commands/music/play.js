const {
    MessageEmbed
} = require("discord.js")
const {
    joinVoiceChannel
} = require('@discordjs/voice');
const {
    ErrorMessage
} = require("../../fc")

module.exports = {
    name: "play",
    aliases: ["p"],
    cooldown: 2,
    inVoiceChannel: true,
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
                if (member.voice.channelId !== me.voice.channelId) message.channel.send({
                    embeds: [difvc]
                });
            }
            const string = args.join(" ")

            const error = new MessageEmbed()
                .setDescription(`${client.emotes.error} | Please enter a valid song name or a valid url`)
                .setColor(client.config.embed);
            if (!string) return message.channel.send({
                embeds: [error]
            })

            try {
                await client.distube.play(message, string)
                const queuee = await client.distube.getQueue(message)

               
                queuee.setVolume(100);
            } catch (e) {
                const fetcherror = new MessageEmbed()
                    .setColor(client.config.embed)
                    .setDescription(`${client.emotes.error} | I couldn't fetch any songs from the provided \`URL/Text\``)
                return message.reply({
                    embeds: [fetcherror]
                })
            }
            if (string.includes("spotify.com")) {
                const queue = await client.distube.getQueue(message)
                queue.songs[queue.songs.length - 1].source = "spotify"
            }
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}