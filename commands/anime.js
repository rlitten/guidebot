
const malScraper = require('mal-scraper');
const Discord = require("discord.js");
const talkedRecently = new Set();

exports.run = async (client, message, args) => {
    let query = '';
    args.forEach((arg) => {
        query += arg + " ";
    });

    // -- CHILLOUT START
    if (talkedRecently.has(message.author.id)) {
        message.channel.send("Chill out dude!");
        return;
    } else {
        talkedRecently.add(message.author.id);
        setTimeout(() => {
            // Removes the user from the set after 5 seconds
            talkedRecently.delete(message.author.id);
        }, 5000);

        malScraper.getInfoFromName(query)
        .then((data) => {
            const embed = new Discord.RichEmbed()
            .setTitle(data.title)
            .setColor(0x00AE86)
            .setDescription(data.synopsis)
            .setImage(data.picture)
            .addField(data.ranked)

        message.channel.send(embed);
    })
    .catch((err) => console.log(err))
    }
    // -- CHILLOUT END
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "anime",
    category: "Miscelaneous",
    description: "Searches the My Anime List for the search title.",
    usage: "<search:str> [resultNum:int]"
};