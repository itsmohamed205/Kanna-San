const {
    MessageEmbed,
    MessageButton,
    MessagActionRow
} = require("discord.js")
const client = require("../index")

const status = queue => `Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.join(", ") || "Off"}\` | Loop: \`${queue.repeatMode ? queue.repeatMode === 2 ? "All Queue" : "This Song" : "Off"}\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``
client.distube
    .on("playSong", (queue, song) => queue.textChannel.send(
        `${client.emotes.play} | Playing \`${song.name}\``
    ))


client.distube.on("addSong", (queue, song) => {
    let source
    if (song.source === "youtube") {
        source = "<:YouTube:914836593615970364> YouTube";
    } else {
        source = "<:SpotifyLogo:914834257640304650> Spotify"
    }
    const addembed = new MessageEmbed()
        .setAuthor({
            name: "Song Added Successfully!",
            URL: song.url
        })
        .setDescription(`**Name**: \`${song.name}\`\n**Source**: ${source}`)
        .setFooter(`Duration: ${song.formattedDuration}`)
        .setThumbnail(song.thumbnail)
    queue.textChannel.send({
        embeds: [addembed]
    })
})
client.distube
    .on("addList", (queue, playlist) => queue.textChannel.send(
        `${client.emotes.success} | Added \`${playlist.name}\` playlist (${playlist.songs.length} songs) to queue\n${status(queue)}`
    ))
    // DisTubeOptions.searchSongs = true
    .on("searchResult", (message, result) => {
        let i = 0
        message.channel.send(`**Choose an option from below**\n${result.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``).join("\n")}\n*Enter anything else or wait 60 seconds to cancel*`)
    })
    // DisTubeOptions.searchSongs = true
    .on("searchCancel", message => message.channel.send(`${client.emotes.error} | Searching canceled`))
    .on("error", async (channel, e) => {
        try {
            const embed = new MessageEmbed()
              .setColor("#cf352e")
              .setDescription(`${client.emotes.error} | **The System detected a new error!**\nTriggered Command: **\`Music Command\`**\nServer: **\`${channel.guild.name} (ID: ${channel.guild.id})\`**\nError:\n\`\`\`\n${e}\n\`\`\``)
              .setTimestamp()
              .setFooter({
                  text: "Error Time"
                });
            const home = await client.guilds.cache.get(client.config.channels.guild)
            const channel = await home.channels.cache.get(client.config.channels.error)
            await channel.send({
              embeds: [embed]
            })
            const msgreply = new MessageEmbed()
              .setDescription(`${client.emotes.error} | Gomen, Our code has detected an error and it has been reported to the developer`)
              .setColor(client.config.embed)
              .setImage("https://66.media.tumblr.com/45ba2af78935a92480b6f0669fae12ed/tumblr_o5owisl7TP1sdn6j2o1_500.gif")

            channel.send({
              embeds: [msgreply]
            })
          } catch (e) {
            console.log(e)
          }
        }
    )
    .on("empty", queue => queue.textChannel.send(`${client.emotes.success} | Voice channel is empty! I will go serve others!`))
    .on("searchNoResult", message => message.channel.send(`${client.emotes.error} | No result found!`))
    .on("finish", queue => queue.textChannel.send(`${client.emotes.stop} | Yay the queue is empty! Time to clean!`))