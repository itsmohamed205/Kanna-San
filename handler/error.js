const Discord = require("discord.js")

module.exports = (client) => {

    const errChannel = "913193049549602826"

    process.on('unhandledRejection', (reason, p) => {

        console.log(" [Anti-crash] :: Unhandled Rejection/Catch")
        console.log(reason, p)

        const errEmbed = new Discord.MessageEmbed()
        
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + reason + "\n\n" + p + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System");

            const embed = new Discord.MessageEmbed()
    .setColor("#cf352e")
      .setDescription(`${client.emotes.error} | **The System detected a new error!**`)
      .addFields({
        name: `Error Type:`,
        value: `**\`Unhandled Rejection/Catch\`**`,
        inline: true
      },
      {
        name: "Error?P",
        value: `**\`${p}\`**`,
        inline: true
      },
      {
        name: "Error:",
        value: ```\`\`\`\n${reason}\n\`\`\``,
        inline: true
      },
      {
        name: "Error Time:",
        value: `<t:${new Date.getTime() / 1000}:R>`,
        inline: true
      })
      .setThumbnail("https://64.media.tumblr.com/dce2ad194fa83a5b5b8a5aaac3a82ff2/tumblr_nuamnqrEV91tydz8to1_540.gifv");

        client.channels.cache.get(errChannel).send({ embeds: [embed] })

    })

    process.on('uncaughtException', (err, origin) => {

        console.log(" [Anti-crash] :: Uncaught Exception/Catch")
        console.log(err, origin)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

    process.on('uncaughtExceptionMonitor', (err, origin) => {

        console.log(" [Anti-crash] :: Uncaught Exception/Catch (MONITOR)")
        console.log(err, origin)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + err + "\n\n" + origin + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

    process.on('multipleResolves', (type, promise, reason) => {

        console.log(" [Anti-crash] :: Multiple Resolves")
        console.log(type, promise, reason)

        const errEmbed = new Discord.MessageEmbed()
            .setColor("RED")
            .setTitle("⚠ New Error")
            .setDescription("An error just occured in the bot console!**\n\nERROR:\n\n** ```" + type + "\n\n" + promise + "\n\n" + reason + "```")
            .setTimestamp()
            .setFooter("Anti-Crash System")

        client.channels.cache.get(errChannel).send({ embeds: [errEmbed] })

    })

}