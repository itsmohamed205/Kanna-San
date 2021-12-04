const {MessageEmbed, MessageButton, messageActionRow, MessageActionRow} = require("discord.js")
const {ErrorMessage} = require("../../fc")

module.exports = {
    name: "volume",
    aliases: ["vol"],
    description: "set the volume of the queue",
    cooldown: 1,
    permissions: [],

run: async (client, message, args) => {
    try{
        const novc = new MessageEmbed()
        .setDescription(`${client.emotes.error} | You are not connected to a VC`)
        .setColor(client.config.embed);

        const member = await message.guild.members.cache.get(message.author.id);
        if(!member.voice.channelId || member.voice.channelId === null)return message.channel.send({ embeds: [novc]})

        const queue = client.distube.getQueue(message)

        const noqu = new MessageEmbed()
        .setDescription(`${client.emotes.error} | The queue is clean, Tohru cleaned it from a while`)
        .setColor(client.config.embed);

        if (!queue) return message.channel.send({embeds: [noqu]});
        
        
        let statev;
        let statep;
        let states;
        let stateo;
        if(parseInt(queue.volume) <= 10) {
            statev = {
            style: "SECONDARY",
            disabled: true
        }
        statep = {
            style: "SUCCESS",
            disabled: false
        }
    } else {
        statev = {
            style: "SUCCESS",
            disabled: false
    }
    statep = {
        style: "SECONDARY",
        disabled: true
    }
}

if(parseInt(queue.volume) === 0) {
    states = {
        style: "SECONDARY",
        disabled: true
    }
    stateo = {
        style: "SUCCESS",
        disabled: false
    }
} else {
    states = {
        style: "SUCCESS",
        disabled: false
    }
    stateo = {
        style: "SECONDARY",
        disabled: true
    }
}
        const buttons = new MessageActionRow().addComponents(
            new MessageButton()
            .setStyle(statev.style)
            .setCustomId("volumeminus")
            .setDisabled(statev.disabled)
            .setEmoji("915408576376348702")
            .setLabel("-10"),

            new MessageButton()
            .setStyle(statep.style)
            .setCustomId("volumeplus")
            .setDisabled(statep.disabled)
            .setEmoji("915408576376348702")
            .setLabel("+10"),

            new MessageButton()
            .setStyle(states.style)
            .setCustomId("volumemute")
            .setDisabled(states.disabled)
            .setEmoji("915408576376348702")
            .setLabel("Mute"),

            new MessageButton()
            .setStyle(stateo.style)
            .setCustomId("volumeopen")
            .setDisabled(stateo.disabled)
            .setEmoji("915408576376348702")
            .setLabel("Unmute")
        )
        const channelvc = await message.guild.channels.cache.get(member.voice.channelId)
        const novol = new MessageEmbed()
        .setColor(client.config.embed)
        .setThumbnail(queue.songs[0].thumbnail)
        .setAuthor(queue.songs[0].name, "https://emoji.gg/assets/emoji/7670-musicbeat.gif", queue.songs[0].url)
        .setDescription(`Current Queue Volume is \`${queue.volume}\` ${client.emotes.play} For \`${channelvc.name}\``);

        if(!args[0] || args[0] === undefined)return message.channel.send({embeds: [novol], components: [buttons]})
        
        const volume = parseInt(args[0])
        const numberv = new MessageEmbed()
        .setDescription(`${client.emotes.error} | Please enter a valid number [1-100] Senpai`)
        .setColor(client.config.embed);

        if (isNaN(volume) || volume > 100 || volume < 0) return message.channel.send({embeds: [numberv]})

        const done = new MessageEmbed()
        .setDescription(`${client.emotes.success} | Kobayashi set volume from \`${queue.volume}\` to \`${volume}\``)
        .setColor(client.config.embed);

        queue.setVolume(volume)
        message.channel.send({embeds: [done]})
     
        const collector = await originMsg.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

    } catch (e) {ErrorMessage(message, e)}
}
}