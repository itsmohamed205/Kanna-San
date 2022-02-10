const {
    Client,
    Message,
    MessageEmbed
} = require('discord.js');
const Kitsu = require('search-kitsu');
const {
    ErrorMessage
} = require("../../fc")
const API = new Kitsu();
const getColors = require("get-image-colors")
module.exports = {
    name: 'anime',
    coolddown: 3,
    aliases: ['No aliases'],
    description: 'Searchs for Anime using The name',

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

        let Anime;

        let Embed;

        try {
    
            await API.searchAnime(Text).then(manga => {
                let title;
                await getColors(manga[0].attributes.posterImage.original).then(async colors => {
                    colors = await colors.map(color  => color.hex())
                
                title = manga[0].attributes.titles.en_jp;
                if (
                    !manga[0].attributes.titles.en_jp ||
                    manga[0].attributes.titles.en_jp === null
                )
                    title =
                        manga[0].attributes.titles.en || manga[0].attributes.titles.en_us;
                Embed = new MessageEmbed()
                    .setColor(colors[0])
                    .setURL(`https://kitsu.io/anime/${manga[0].id}`)
                    .setTitle(title)
                    .setDescription(manga[0].attributes.synopsis)
                    .addField(`📁Type`, `${manga[0].attributes.subtype}`, true)
                    .addField(`⏳Status`, `${manga[0].attributes.status}`, true)
                    .addField(
                        `📅Published`,
                        `From ${manga[0].attributes.startDate} To ${manga[0].attributes.endDate ? manga[0].attributes.endDate : '?'
                        }`, true
                    )
                    .addField(
                        '👤Age Rating',
                        `${manga[0].attributes.ageRatingGuide}(${manga[0].attributes.ageRating
                        })`, true
                    )
                    .addField(
                        `💽Episodes`,
                        `${manga[0].attributes.episodeCount
                            ? manga[0].attributes.episodeCount.toString()
                            : '?'
                        }
					`
                        , true)
                    .addField(
                        '⏱️Duration',
                        `
Total: ${manga[0].attributes.totalLength
                            ? manga[0].attributes.totalLength.toString()
                            : '?'
                        }m
Episode: ${manga[0].attributes.episodeLength
                            ? manga[0].attributes.episodeLength.toString()
                            : '?'
                        }m`, true
                    )

                    .addField('🏆Popularity', `#${manga[0].attributes.ratingRank}`)

                    .setThumbnail(manga[0].attributes.posterImage.original)
                    .addField(`⭐Score`, `${manga[0].attributes.averageRating}/100`, true);
           
                    })
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