const { MessageEmbed } = require("discord.js")
const client = require("../index");
const { onCoolDown } = require("../fc");
client.on("messageCreate", async (message) => {
  if(!message.guild)return
  let prefix;
  prefix = await client.db.get(`prefix_${message.guild.id}`)
  if(!prefix || prefix === undefined)prefix = client.config.prefix
  if(message.content.includes(client.user.id) && !message.content.toLowerCase().startsWith(prefix) && !message.author.bot) return message.channel.send(`Ohayo, My prefix for this server is **\`${prefix}\`**`)
  
    if (message.author.bot || !message.guild)return
  
  if(!message.content.toLowerCase().startsWith(prefix))return 
const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));

    if (!command) return;

let perms = new MessageEmbed()
      .setDescription(`${client.emotes.error} | Gomen, You don't have enough permissions to run the command.`)
     .setColor(client.config.embed);
  if(!message.member.permissions.has(command.permissions || []))
      return message.channel.send({ embeds: [perms] });
  
  
      if (onCoolDown(message, command)) {
      let cool = new MessageEmbed()
      .setDescription(`${client.emotes.stop} | Tohru taught me spamming is bad, Please wait ${onCoolDown(message, command)} second(s)`)
     .setColor(client.config.embed);
      return message.channel.send({embeds : [cool]})
  }
   
  await command.run(client, message, args);
});
