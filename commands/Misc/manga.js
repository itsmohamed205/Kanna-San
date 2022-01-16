const {
    ErrorMessage
} = require("../../fc")
const {
    get
} = require('request-promise-native');
const {
    MessageEmbed
} = require('discord.js');
const Kitsu = require('search-kitsu');

const API = new Kitsu();
module.exports = {
    name: 'manga',
    description: 'Searchs For Manga Using The Name',
    aliases: ['No aliases'],
    cooldown: 3,

    run: async (client, message, args) => {
        const argserror = new MessageEmbed()
            .setDescription(
                `${client.emotes.error} | Enter a valid name to search for it`
            )
            .setColor(client.config.embed);

        let Text = args.join(' ');

        if (!Text) return message.channel.send({
            embeds: [argserror]
        });

        if (Text.length > 200) return message.channel.send({
            embeds: [argserror]
        });

        let Msg = await message.channel.send(
            `${client.emotes.play} | Searching Kitsu database...`
        );

        let Replaced = Text.replace(/ /g, ' ');

        let MangaData;

        let Embed;

        try {
            await API.searchManga(Text).then(manga => {
                let title;
                title = manga[0].attributes.titles.en_jp;
                if (
                    !manga[0].attributes.titles.en_jp ||
                    manga[0].attributes.titles.en_jp === null
                )
                    title =
                    manga[0].attributes.titles.en || manga[0].attributes.titles.en_us;
                Embed = new MessageEmbed()
                    .setColor('RANDOM')
                    .setURL(`https://kitsu.io/manga/${manga[0].id}`)
                    .setTitle(title)
                    .setDescription(manga[0].attributes.synopsis)
                    .addField(`📁Type`, `${manga[0].attributes.subtype}`)
                    .addField(`⏳Status`, `${manga[0].attributes.status}`)
                    .addField(
                        `📅Published`,
                        `From ${manga[0].attributes.startDate} To ${
							manga[0].attributes.endDate ? manga[0].attributes.endDate : '?'
						}`
                    )
                    .addField(
                        `📚Volume Count`,
                        `${
							manga[0].attributes.volumeCount
								? manga[0].attributes.volumeCount.toString()
								: '?'
						}
					`
                    )
                    .addField(
                        '📰Chapter Count',
                        `${
							manga[0].attributes.chapterCount
								? manga[0].attributes.chapterCount.toString()
								: '?'
						}`
                    )
                    /*	.addField(
                    		`Next Release`,
                    		`${
                    			manga[0].attributes.nextRelease
                    				? manga[0].attributes.nextRelease.toString()
                    				: 'No News Yet!'
                    		}`
                    	)*/

                    .addField('🏆Popularity', `#${manga[0].attributes.ratingRank}`)
                    /*
                    .addField(`Genres`, manga[0].relationships.genres)
                    */
                    .setThumbnail(manga[0].attributes.posterImage.original)
                    .setFooter(`Score - ${manga[0].attributes.averageRating}`);
            });
        } catch (error) {
            console.log(error);
            await Msg.delete();
            return message.channel.send(
                `${client.emotes.error} | No results found for "${Text}"`
            );
        }
        try {
            await Msg.delete();
            return message.channel.send({
                embeds: [Embed]
            });
        } catch (e) {
            ErrorMessage(message, e)
        }
    }
};