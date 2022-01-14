const {ErrorMessage} = require("../../fc");
const {MessageEmbed} = require("discord.js")

module.exports = {
name: "loop",
aliases: ["repeat"],
cooldown: 3,
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

        const helpl = new MessageEmbed()
        .setColor(client.config.embed)
        .setDescription(`Supported Loop modes:\n**\`song\`**: set loop mode to song\n**\`queue\`**: set mode loop mode to queue\nTo disable the loop mode use \`off\``);
    try{
        let mode = null
        if(args[0] === undefined)args[0] = "empty"
        switch (args[0].toLowerCase()) {
            case "off":
                mode = 0
                break
            case "song":
                mode = 1
                break
            case "queue":
                mode = 2
                break
        }
        if(mode === null)return message.channel.send({embeds: [helpl]})
        mode = queue.setRepeatMode(mode)
        mode = mode ? mode === 2 ? "Loop queue" : "Loop song" : "Off"
        message.channel.send(`${client.emotes.success} | Set Loop mode to \`${mode}\``)
    } catch (er) { ErrorMessage(message, er) };
        
} catch (e) {ErrorMessage(message, e)}
}}