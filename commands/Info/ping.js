const {
    MessageEmbed
} = require('discord.js');
const {
    ErrorMessage
} = require("../../fc")
module.exports = {
    name: 'ping',
    aliases: ['No aliases'],
    description: 'Shows Bot ping',
    cooldown: 5,

    run: (client, message, args) => {

        try {
            message.channel.send(`${client.emotes.play} Checking Latency...`).then((msg) => {

                setTimeout(async function () {
                    const datembed = new MessageEmbed()
                        .setColor("RANDOM")
                        .setAuthor({
                            name: "Ping Pong! :D",
                            iconURL: "https://images-ext-1.discordapp.net/external/HgmGiJIakRAEJMHoLpzaPVVC7OfA3NTqVbFqzDRmrlo/%3Fv%3D1%26size%3D64/https/cdn.discordapp.com/emojis/839699327219007528.gif"
                        })
                        .setThumbnail('https://media.discordapp.net/attachments/692555215299411989/940407680881819688/latency.png?width=473&height=473')
                        .setDescription(`**Latency**: ${Date.now() - message.createdTimestamp - 2500}ms\n**API Latency**: ${Math.round(client.ws.ping)}ms`)
                    try {
                        msg.edit({
                            embeds: [datembed],
                            content: " "
                        })
                    } catch (e) {
                        return
                    }
                }, 2500)

            })
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}