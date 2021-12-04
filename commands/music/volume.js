const {
    MessageEmbed,
    MessageButton,
    messageActionRow,
    MessageActionRow
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
    cooldown: 1,
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
            console.log(queue.songs[0].name + ": " + queue.songs[0].source)
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
            } else {
                const volume = parseInt(args[0])
                const numberv = new MessageEmbed()
                    .setDescription(`${client.emotes.error} | Please enter a valid number [1-100] Senpai`)
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
            }
            if (!volumereply && volumereply === undefined) return
            const collector = await volumereply.createMessageComponentCollector({
                componentType: 'BUTTON',
                time: 180000
            });
            collector.on("collect", async button => {
                try {
                    const buttonsnew = new MessageActionRow().addComponents(
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
                    const msg = await button.channel.messages.fetch(button.message.id);
                    if (msg.id !== volumereply.id) return
                    const queuebutton = client.distube.getQueue(button)
                    if (!queuebutton) return button.reply({
                        content: "the queue is empty, i saw Tohru clean it",
                        ephermal: true
                    })

                    if (button.customId === "volumeplus") {
                        if (queuebutton.volume + 10 >= 100) {
                            queuebutton.setVolume(100)
                        } else {
                            await queuebutton.setVolume(queuebutton.volume + 10)
                        }
                        if (queuebutton.songs[0].source === "youtube") {
                            source = "<:YouTube:914836593615970364> YouTube";
                        } else {
                            source = "<:SpotifyLogo:914834257640304650> Spotify"
                        }
                        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
                        const novole = new MessageEmbed()
                            .setColor(client.config.embed)
                            .setThumbnail(queuebutton.songs[0].thumbnail)
                            .setAuthor(queuebutton.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queuebutton.songs[0].url)
                            .setDescription(`Current Queue Volume is \`${queuebutton.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queuebutton.songs[0].formattedDuration}\`**\nSource: **${source}**`);
                        try {
                            button.update({
                                embeds: [novole],
                                components: [buttonsnew]
                            })
                        } catch (t) {
                            return ErrorMessage(message, t)
                        }
                    } else if (button.customId === "volumeminus") {
                        if (queuebutton.volume - 10 < 0) {
                            queuebutton.setVolume(0)
                        } else {
                            await queuebutton.setVolume(queuebutton.volume - 10)
                        }
                        if (queuebutton.songs[0].source === "youtube") {
                            source = "<:YouTube:914836593615970364> YouTube";
                        } else {
                            source = "<:SpotifyLogo:914834257640304650> Spotify"
                        }
                        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
                        const novola = new MessageEmbed()
                            .setColor(client.config.embed)
                            .setThumbnail(queuebutton.songs[0].thumbnail)
                            .setAuthor(queuebutton.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queuebutton.songs[0].url)
                            .setDescription(`Current Queue Volume is \`${queuebutton.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queuebutton.songs[0].formattedDuration}\`**\nSource: **${source}**`);
                        try {
                            button.update({
                                embeds: [novola],
                                components: [buttonsnew]
                            })
                        } catch (t) {
                            return ErrorMessage(message, t)
                        }
                    } else if (button.customId === "volumemute") {
                        await queuebutton.setVolume(0)
                        if (queuebutton.songs[0].source === "youtube") {
                            source = "<:YouTube:914836593615970364> YouTube";
                        } else {
                            source = "<:SpotifyLogo:914834257640304650> Spotify"
                        }
                        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
                        const novelem = new MessageEmbed()
                            .setColor(client.config.embed)
                            .setThumbnail(queuebutton.songs[0].thumbnail)
                            .setAuthor(queuebutton.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queuebutton.songs[0].url)
                            .setDescription(`Current Queue Volume is \`${queuebutton.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queuebutton.songs[0].formattedDuration}\`**\nSource: **${source}**`);
                        try {
                            button.update({
                                embeds: [novelem],
                                components: [buttonsnew]
                            })
                        } catch (t) {
                            return ErrorMessage(message, t)
                        }
                    } else if (button.customId === "volumeopen") {
                        await queuebutton.setVolume(100)
                        if (queuebutton.songs[0].source === "youtube") {
                            source = "<:YouTube:914836593615970364> YouTube";
                        } else {
                            source = "<:SpotifyLogo:914834257640304650> Spotify"
                        }
                        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
                        const hii = new MessageEmbed()
                            .setColor(client.config.embed)
                            .setThumbnail(queuebutton.songs[0].thumbnail)
                            .setAuthor(queuebutton.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queuebutton.songs[0].url)
                            .setDescription(`Current Queue Volume is \`${queuebutton.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queuebutton.songs[0].formattedDuration}\`**\nSource: **${source}**`);
                        try {
                            button.update({
                                embeds: [hii],
                                components: [buttonsnew]
                            })
                        } catch (t) {
                            return ErrorMessage(message, t)
                        }
                    }
                } catch (e) {
                    ErrorMessage(message, e)
                }
            })
            collector.on("end", async button => {

                const channelvc = await message.guild.channels.cache.get(me.voice.channelId)
                const queuebutton = client.distube.getQueue(message)
                if (!queuebutton) return button.update({
                    components: []
                })
                if (queuebutton.songs[0].source === "youtube") {
                    source = "<:YouTube:914836593615970364> YouTube";
                } else {
                    source = "<:SpotifyLogo:914834257640304650> Spotify"
                }
                const ende = new MessageEmbed()
                    .setColor(client.config.embed)
                    .setFooter("Expired Queue Info", "https://emoji.gg/assets/emoji/3786_KannaOOF.gif")
                    .setThumbnail(queuebutton.songs[0].thumbnail)
                    .setAuthor(queuebutton.songs[0].name, "https://emoji.gg/assets/emoji/9237_MikuMusic.png", queuebutton.songs[0].url)
                    .setDescription(`Current Queue Volume is \`${queuebutton.volume}\` ${client.emotes.play} For \`${channelvc.name}\`\nDuration: **\`${queuebutton.songs[0].formattedDuration}\`**\nSource: **${source}**`);
                try {
                    volumereply.edit({
                        embeds: [ende],
                        components: []
                    })
                } catch (e) {
                    return
                }
            })
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}