const { MessageEmbed } = require('discord.js');
const { ErrorMessage } = require("../../fc")
module.exports = {
    name: 'ping',
    aliases: ['No aliases'],
    description: 'Shows Bot ping',
    cooldown: 2,
    
run: (client, message, args) => {

try {
const datembed = new MessageEmbed()
    .setColor(client.config.embed)
    .setDescription(`**Latency**: ${Date.now() - message.createdTimestamp}ms\n**API Latency**: ${Math.round(client.ws.ping)}ms`)
      
message.channel.send({ embeds: [datembed] })

} catch (e) {
ErrorMessage(message, e)  
}
}}