const {
    Client,
    Message,
    MessageEmbed,
    MessageButton,
    MessageActionRow
} = require("discord.js");

const getColors = require("get-image-colors")

const {
    ErrorMessage
} = require("../../fc")

module.exports = {
    name: "avatar",
    aliases: ["av"],
    cooldown: 3,
    description: "Shows the user avatar",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {
        let user
        if (message.mentions.users.first() !== undefined) {
            user = await message.guild.members.cache.get(message.mentions.users.first().id)
        } else {

            user = message.guild.members.cache.get(args[0]) || message.guild.members.cache.get(message.author.id)
        };

        const buttons = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setStyle("LINK")
                    .setEmoji("940351491590488114")
                    .setLabel("Download")
                    .setURL(user.user.displayAvatarURL({
                        dynamic: true,
                        size: 1024,
                    }))
            )


        await getColors(user.user.displayAvatarURL({ dynamic: true, format: "png" })).then(async colors => {
            colors = await colors.map(color => color.hex())

            let avs = new MessageEmbed()
                .setColor(colors[0])
                .setURL(user.user.displayAvatarURL({
                    dynamic: true,
                }))
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setImage(user.user.displayAvatarURL({
                    dynamic: true,
                    size: 512,
                }));
            try {
                message.channel.send({
                    embeds: [avs],
                    components: [buttons]
                })

            } catch (e) {
                ErrorMessage(message, e)
            }
        })
    },
}