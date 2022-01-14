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


module.exports = {
    name: "queue",
    description: "show the server queue",
    cooldown: 5,
    permissions: [],
    aliases: ["q"],

    run: async (client, message, args) => {
        try {
return message.channel.send("Command is locked down due to many errors");
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
                .setCustomId("qback")
                .setDisabled()
                .setEmoji("882100071460667402")
                .setStyle("SECONDARY"),

                new MessageButton()
                .setCustomId("qstop")
                .setEmoji("882112522713452585")
                .setStyle("SUCCESS"),

                new MessageButton()
                .setCustomId("qnext")
                .setEmoji("882099970596020295")
                .setStyle("SUCCESS")
            );


            //const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")
            //console.log(queue.songs)

            //let emojil;    
            const queuedata = queue.songs.map((song, i) => `${song.source === "youtube" ? "<:YouTube:914836593615970364> " : "<:SpotifyLogo:914834257640304650> "}[${song.name}](${song.url}) - **\`${song.formattedDuration}\`**`).join("\n")
            console.log(queuedata.length)
            console.log(queuedata.size)

            if (queuedata.length > 4096) {
                await queuedata.slice(0, 29)

                const test = new MessageEmbed()
                    .setColor(client.config.embed)
                    .setDescription(`${queuedata}`)
                    .setFooter("The queue command isn't complete gomen...")
                    .setTitle("Server Queue:");

                message.channel.send({
                    embeds: [test],
                    components: [buttons]
                })



            } else {


                const qtest = new MessageEmbed()
                    .setColor(client.config.embed)
                    .setDescription(`${queuedata}`)
                    .setTitle("Server Queue:");

                message.channel.send({
                    embeds: [qtest]
                })

            }

        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}