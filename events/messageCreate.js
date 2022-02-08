const {
  MessageEmbed
} = require("discord.js")
const client = require("../index");
const {
  onCoolDown
} = require("../fc");
const ms = require("ms")
client.on("messageCreate", async (message) => {
  if (!message.guild) return
  let prefix;
  prefix = await client.db.get(`prefix_${message.guild.id}`)
  if (!prefix || prefix === undefined) prefix = client.config.prefix
  if (message.content.includes(client.user.id) && !message.content.toLowerCase().startsWith(prefix) && !message.author.bot) return message.channel.send(`Ohayo, My prefix for this server is **\`${prefix}\`**`)

  if (message.author.bot || !message.guild) return

  if (!message.content.toLowerCase().startsWith(prefix)) return
  const [cmd, ...args] = message.content.slice(prefix.length).trim().split(" ");

  const command = client.commands.get(cmd.toLowerCase()) || client.commands.get(client.aliases.get(cmd.toLowerCase()));

  if (!command) return;

  let perms = new MessageEmbed()
    .setDescription(`${client.emotes.error} | Gomen, You don't have enough permissions to run the command.`)
    .setColor(client.config.embed)
    .setImage("https://images.gr-assets.com/hostedimages/1460026917ra/18687747.gif")
  if (!message.member.permissions.has(command.permissions || []))
    return message.channel.send({
      embeds: [perms]
    });


  if (onCoolDown(message, command)) {
    let cool = new MessageEmbed()
      .setDescription(`${client.emotes.stop} | Hold on Senpai i won't be able to process anything if i let you run the command that fast, show some mercy!\nCooldown time: ${ms(onCoolDown(message, command))}`)
      .setColor(client.config.embed)
      .setImage("https://media.discordapp.net/attachments/692555215299411989/940342793233137755/hiDNepUTK1K4sQ_pxv_XQrAvSnzqiQ5NXwLLzWDHte85gwKQuFpqEUWfubHyptPTXwuxEudvTG-SdnfSJqf-8W1P71YNLQhCHssIiAL3qnMMpGeqEmcOBCnxt1-mOvEx.gif")
    return message.channel.send({
      embeds: [cool]
    })
  }

  await command.run(client, message, args);
});