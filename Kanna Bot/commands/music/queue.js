const {MessageEmbed, MessageActionRow, MessageButton} = require("discord.js")
const {ErrorMessage} = require("../../fc")
const { description } = require("./stop")

module.exports = {
    name: "queue",
    description: "show the server queue",
    cooldown: 5,
    permissions: [],
    aliases: ["q"],

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


const q = queue.songs.map((song, i) => `${i === 0 ? "Playing:" : `${i}.`} ${song.name} - \`${song.formattedDuration}\``).join("\n")

const qtest = new MessageEmbed()
.setColor(client.config.embed)
.setDescription(`****`)
.setTitle("Server Queue:");

        
        message.channel.send({embeds: [qtest], components: [buttons]})
     
        console.log(queue.songs)

    } catch (e) {ErrorMessage(message, e)}
}
}