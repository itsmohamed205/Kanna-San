const { Client, Message, MessageEmbed } = require('discord.js');

module.exports = {
    name: 'ping',
    aliases: ['No aliases'],
    categories : 'info',
    permissions : '', 
    description: 'Shows Bot ping',
    usage: '',
    
run: (client, message, args) => {

try {
  /*
let days = Math.floor(client.uptime / 86400000);
let hours = Math.floor(client.uptime / 3600000) % 24;
let minutes = Math.floor(client.uptime / 60000) % 60;
let seconds = Math.floor(client.uptime / 1000) % 60;
const uiuser = client.guilds.cache.reduce((a, g) => a + g.memberCount, 0);
*/
const datembed = new MessageEmbed()
    .setColor("#ff1ac6")
   // .setTitle(`**My Stats Senpai**`)
    .setDescription(`Senpai, My ping is ${client.ws.ping}ms`)
    .setFooter("Good Day, isn't it? |")
   // .setImage("https://images-ext-2.discordapp.net/external/CjWIgsSoR7ErWZFKFOSguYwgEjnvKPNdHfwcBY9t_no/https/media.discordapp.net/attachments/692555215299411989/849290263834001418/AS_divider.gif")
    .setTimestamp();
      
message.channel.send({ embeds: [datembed] })

} catch (e) {

console.log(e);

  
}
}}