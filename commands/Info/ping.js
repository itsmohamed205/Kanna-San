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
                        .setColor(client.config.embed)
                        .setDescription(`**Latency**: ${Date.now() - message.createdTimestamp - 1000}ms\n**API Latency**: ${Math.round(client.ws.ping)}ms`)
                    try {
                        msg.edit({
                            embeds: [datembed],
                            content: " "
                        })
                    } catch (e) {
                        return
                    }
                }, 1000)

            })
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
}