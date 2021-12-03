const { MessageEmbed } = require("discord.js")
const { ErrorMessage } = require("../../fc")

module.exports = {
    name: "play",
    aliases: ["p"],
    cooldown: 3,
    inVoiceChannel: true,
    run: async (client, message, args) => {
        try {
        const novc = new MessageEmbed()
        .setDescription(`${client.emotes.error} | You are not connected to a VC`)
        .setColor(client.config.embed);

        const member = await message.guild.members.cache.get(message.author.id);
        if(!member.voice.channelId || member.voice.channelId === null)return message.channel.send({ embeds: [novc]})
        const string = args.join(" ")
        
        const error = new MessageEmbed()
        .setDescription(`${client.emotes.error} | Please enter a valid song name or a valid url`)
        .setColor(client.config.embed);
        
        if (!string) return message.channel.send({ embeds: [error] })
        
        
            client.distube.play(message, string)
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}