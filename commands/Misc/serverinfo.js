const {
    ErrorMessage
} = require("../../fc")
const {
    MessageEmbed
} = require('discord.js');
const moment = require('moment');

module.exports = {
    name: 'serverinfo',
    aliases: ['serverdata', "infoserver"],
    cooldown: 3,
    description: 'Shows info about a server',
    run: async (client, message, args) => {
        try {
            function trimArray(arr, maxLen = 25) {
                if (arr.array().length > maxLen) {
                    const len = arr.array().length - maxLen;
                    arr = arr
                        .array()
                        .sort((a, b) => b.rawPosition - a.rawPosition)
                        .slice(0, maxLen);
                    arr.map(role => `<@&${role.id}>`);
                    arr.push(`${len} more...`);
                }
                return arr.join(', ');
            }
            await message.guild.members.fetch();

            function emojitrimarray(arr, maxLen = 20) {
                if (arr.length > maxLen) {
                    const len = arr.length - maxLen;
                    arr = arr.slice(0, maxLen);
                    arr.push(`${len} more...`);
                }
                return arr.join(', ');
            }
            const channels = await message.guild.channels.cache;
            const roles = message.guild.roles.cache
                .sort((a, b) => b.position - a.position)
                .map(role => role.toString())
                .slice(0, -1);
            let boosts = message.guild.premiumSubscriptionCount;
            var boostlevel = 0;
            if (boosts >= 2) boostlevel = '1';
            if (boosts >= 15) boostlevel = '2';
            if (boosts >= 30) boostlevel = '3 / ∞';
            let maxbitrate = 96000;
            if (boosts >= 2) maxbitrate = 128000;
            if (boosts >= 15) maxbitrate = 256000;
            if (boosts >= 30) maxbitrate = 384000;
            const embed = new MessageEmbed()
                .setTitle(message.guild.name)
                .setColor('RANDOM')
                .setThumbnail(message.guild.iconURL({
                    dynamic: true
                }))
                .addField('👑Owner', `<@${message.guild.ownerId}>`)
                .addField('🆔Server ID', `${message.guild.id}`)
                .addField(
                    '🗓️Created On',
                    '**' +
                    moment(message.guild.createdTimestamp).format('DD/MM/YYYY') +
                    '**\n' +
                    '**' +
                    moment(message.guild.createdTimestamp).format('hh:mm:ss') +
                    '**'
                )
                .addField(
                    '💬Server Channels',
                    `Text: ${channels.filter(m => m.type == 'GUILD_TEXT').size}
Voice: ${channels.filter(m => m.type == 'GUILD_VOICE').size}`
                )
                .addField(
                    '👥Total Users',
                    `Humans: ${
						message.guild.members.cache.filter(m => !m.user.bot).size
					} (${
						message.guild.members.cache.filter(
							member => member.presence !== null
						).size
					} Online)
Bots: ${message.guild.members.cache.filter(m => m.user.bot).size}`
                )
                .addField('✨Total Boosts', `${message.guild.premiumSubscriptionCount}`)
                /*	.addField(
                	'<:arrow:832598861813776394> Boost-Level',
                	'<a:nitro:833402717506502707> `' + boostlevel + '`',
                	true
                )*/
                .addField(`⚔️Roles`, `${message.guild.roles.cache.size}`)
                .setThumbnail(
                    message.guild.iconURL({
                        dynamic: true
                    })
                );
            message.channel.send({
                embeds: [embed]
            });
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
};