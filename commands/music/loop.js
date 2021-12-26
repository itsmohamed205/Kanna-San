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

        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("volumeminus")
            .setEmoji("915408576376348702")
            .setLabel("-10"),

            new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("volumeplus")
            .setEmoji("915408576376348702")
            .setLabel("+10"),

            new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("volumemute")
            .setEmoji("915408576376348702")
            .setLabel("Mute"),

            new MessageButton()
            .setStyle("SUCCESS")
            .setCustomId("volumeopen")
            .setEmoji("915408576376348702")
            .setLabel("Max")
        )
        let source
        if (queue.songs[0].source === "youtube") {
            source = "<:YouTube:914836593615970364> YouTube";
        } else {
            source = "<:SpotifyLogo:914834257640304650> Spotify"
        }
        //console.log(queue.songs[0].name + ": " + queue.songs[0].source)
        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
        const novol = new MessageEmbed()
            .setColor(client.config.embed)
            .setThumbnail(queue.songs[0].thumbnail)
            .setAuthor(queue.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queue.songs[0].url)
            .setDescription(`Current Queue Volume is \`${queue.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queue.songs[0].formattedDuration}\`**\nSource: **${source}**`);
        let volumereply;
        if (!args[0] || args[0] === undefined) {
            volumereply = await message.channel.send({
                embeds: [novol],
                components: [buttons]
            })
}} catch (e) {ErrorMessage(message, e)}
}}