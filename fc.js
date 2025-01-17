const {
  Client,
  Message,
  MessageEmbed,
  Collection
} = require('discord.js');
const client = require('./index');

/** 
 * @param {Client} client 
 * @param {Message} message 
 * @param {String[]} args 
 */


module.exports.onCoolDown = onCoolDown;
module.exports.ErrorMessage = ErrorMessage;
async function ErrorMessage(message, str) {
  try {
    const embed = new MessageEmbed()
    .setColor("#cf352e")
      .setDescription(`${client.emotes.error} | **The System detected a new error!**`)
      .addFields({
        name: `Triggered Command:`,
        value: `**\`${message.content}\`**`,
        inline: true
      },
      {
        name: "Server:",
        value: `**\`${message.guild.name} (ID: ${message.guild.id})\`**`,
        inline: true
      },
      {
        name: "Error:",
        value: ```\`\`\`\n${str}\n\`\`\``,
        inline: true
      },
      {
        name: "Error Time:",
        value: `<t:${new Date.getTime() / 1000}:R>`,
        inline: true
      })
      .setThumbnail("");
    
    const channel = await client.channels.cache.get(client.config.channels.error)
    await channel.send({
      embeds: [embed]
    })
    const msgreply = new MessageEmbed()
      .setDescription(`${client.emotes.error} | Gomen, Our code has detected an error and it has been reported to the developer`)
      .setColor(client.config.embed)
      .setImage("https://66.media.tumblr.com/45ba2af78935a92480b6f0669fae12ed/tumblr_o5owisl7TP1sdn6j2o1_500.gif")
    message.channel.send({
      embeds: [msgreply]
    })
  } catch (e) {
    console.log(e)
  }
}


/**
 * 
 * @param {*} message A DiscordMessage, with the client, information
 * @param {*} command The Command with the command.name
 * @returns BOOLEAN
 */
function onCoolDown(message, command) {
  if (!message || !message.client) throw "No Message with a valid DiscordClient granted as First Parameter";
  if (!command || !command.name) throw "No Command with a valid Name granted as Second Parameter";
  const client = message.client;
  if (!client.cooldowns.has(command.name)) { //if its not in the cooldown, set it too there
    client.cooldowns.set(command.name, new Collection());
  }
  const now = Date.now(); //get the current time
  const timestamps = client.cooldowns.get(command.name); //get the timestamp of the last used commands
  const cooldownAmount = (command.cooldown) * 1000; //get the cooldownamount of the command, if there is no cooldown there will be automatically 1 sec cooldown, so you cannot spam it^^
  if (timestamps.has(message.author.id)) { //if the user is on cooldown
    const expirationTime = timestamps.get(message.author.id) + cooldownAmount; //get the amount of time he needs to wait until he can run the cmd again
    if (now < expirationTime) { //if he is still on cooldonw
      const timeLeft = (expirationTime - now); //get the lefttime
      //return true
      return timeLeft
    } else {
      //if he is not on cooldown, set it to the cooldown
      timestamps.set(message.author.id, now);
      //set a timeout function with the cooldown, so it gets deleted later on again
      setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
      //return false aka not on cooldown
      return false;
    }
  } else {
    //if he is not on cooldown, set it to the cooldown
    timestamps.set(message.author.id, now);
    //set a timeout function with the cooldown, so it gets deleted later on again
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);
    //return false aka not on cooldown
    return false;
  }
}