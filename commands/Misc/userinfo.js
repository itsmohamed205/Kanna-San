const {
    Client,
    Message,
    MessageEmbed
} = require("discord.js");
const {
    ErrorMessage
} = require("../../fc")
const flags = {
    DISCORD_EMPLOYEE: 'Discord Employee',
    DISCORD_PARTNER: 'Discord Partner',
    BUGHUNTER_LEVEL_1: 'Bug Hunter (Level 1)',
    BUGHUNTER_LEVEL_2: 'Bug Hunter (Level 2)',
    HYPESQUAD_EVENTS: 'HypeSquad Events',
    HOUSE_BRAVERY: 'House of Bravery',
    HOUSE_BRILLIANCE: 'House of Brilliance',
    HOUSE_BALANCE: 'House of Balance',
    EARLY_SUPPORTER: 'Early Supporter',
    TEAM_USER: 'Team User',
    SYSTEM: 'System',
    VERIFIED_BOT: 'Verified Bot',
    VERIFIED_DEVELOPER: 'Verified Bot Developer'
};

module.exports = {
    name: "userinfo",
    aliases: ["ui", "whois"],
    cooldown: 2,
    description: "Shows user info",
    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message, args) => {

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let stet
        if (member !== undefined) stet = member.presence ? .status

        if (!member) {
            try {
                const auth = message.guild.members.cache.get(message.author.id)
                const roles = auth.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => role.toString())
                    .slice(0, -1);
                const rolecount = roles.length
                const userFlags = auth.user.flags.toArray();
                const embed1 = new MessageEmbed()
                    .setTitle("Here is User Data Senpai")
                    .setColor("RANDOM")
                    .setThumbnail(message.author.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField("**👤|Username:**", `${message.author.username}`)
                    .addField("**🔢|Discriminator:**", `${message.author.discriminator}`)
                    .addField("**🤖|Is a Bot:**", `${message.author.bot ? 'Yes.' : 'No.'}`)
                    .addField("**🆔|ID:**", `${message.author.id}`)
                    .addField("**🎖️|Flags:**", userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'User does not have flag.')
                if (auth.presence !== null) {
                    embed1
                        .addField("**🟢|Status:**", auth.presence.status)
                } else {
                    embed1
                        .addField("**🟢|Status:**", "offline")
                }
                embed1
                    .addField("**📅|Account Creation Date:**", `${message.author.createdAt.toLocaleString()}`)
                    //console.log(message.member.roles)
                    .addField("**⬆️|Highest Role:**", auth.roles.highest.id === message.guild.id ? 'User does not have a role.' : `<@&${message.member.roles.highest.id}>`)
                    .addField("**📅|Server Join Date:**", auth.joinedAt.toLocaleString())
                if (roles.length > 0) {
                    if (roles.length < 26) {
                        embed1
                            .addField(`**⚔️|Roles[${rolecount}]:**`, `${roles.join(', ')}`)
                    } else {
                        roles.splice(24, 9000, "etc...")
                        embed1
                            .addField(`**⚔️|Roles[${rolecount}]:**`, `${roles.join(', ')}`)
                    }
                } else {
                    embed1
                        .addField("**⚔️|Roles:**", `User does not have a role.`)
                }
                message.channel.send({
                    embeds: [embed1]
                })
            } catch (e) {
                ErrorMessage(message, e)
            }
        } else {
            try {
                const roles = member.roles.cache
                    .sort((a, b) => b.position - a.position)
                    .map(role => role.toString())
                    .slice(0, -1);
                const rolecount = roles.length
                const userFlags = member.user.flags.toArray();
                const embed2 = new MessageEmbed()
                    .setTitle("Here is User Data Senpai")
                    .setColor("RANDOM")
                    .setThumbnail(member.user.displayAvatarURL({
                        dynamic: true
                    }))
                    .addField("**👤|Username:**", `${member.user.username}`)
                    .addField("**🔢|Discriminator:**", `${member.user.discriminator}`)
                    .addField("**🤖|Is a Bot:**", `${member.user.bot ? 'Yes.' : 'No.'}`)
                    .addField("**🆔|ID:**", `${member.user.id}`)
                    .addField("**🎖️|Flags:**", userFlags.length ? userFlags.map(flag => flags[flag]).join(', ') : 'User does not have flag.')
                if (member.presence !== null) {
                    embed2
                        .addField("**🟢|Status:**", member.presence.status)
                } else {
                    embed2
                        .addField("**🟢|Status:**", "offline")
                }
                embed2
                    .addField("**📅|Account Creation Date:**", `${member.user.createdAt.toLocaleString() }`)
                    .addField("**⬆️|Highest Role:**", member.roles.highest.id === message.guild.id ? 'User does not have a role.' : `<@&${member.roles.highest.id}>`)
                    .addField("**📅|Server Join Date:**", member.joinedAt.toLocaleString())
                console.log(roles.length)
                //roles.push("test")
                if (roles.length > 0) {
                    if (roles.length < 26) {
                        embed2
                            .addField(`**⚔️|Roles[${rolecount}]:**`, `${roles.join(', ')}`)
                    } else {
                        roles.splice(24, 9000, "etc...")
                        embed2
                            .addField(`**⚔️|Roles[${rolecount}]:**`, `${roles.join(', ')}`)
                    }
                } else {
                    embed2
                        .addField("**⚔️|Roles:**", `User does not have a role.`)
                }
                message.channel.send({
                    embeds: [embed2]
                })
            } catch (e) {
                ErrorMessage(message, e)
            }
        }
    }
}