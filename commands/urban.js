const request = require('request');

const Discord = require('discord.js');

exports.run = async (client, message, args) => {
  const baseUrl = 'http://api.urbandictionary.com/v0/define?term=';
  let query = '';

  args.forEach((arg) => {
    query += `${arg} `;
  });

  const theUrl = baseUrl + query;

  request({
    url: theUrl,
    json: true,
  }, (error, response, body) => {
    if (body.list.length === 0) return;

    let definitions = 'Definitions:\n';

    body.list.forEach((res) => {
      definitions += `${res.definition}\n\n`;
      // definitions += `** Example: ** ${res.example}\n`;
      // definitions += `<${res.permalink}>\n\n`;
    });

    if (definitions) {
      const embed = new Discord.RichEmbed()
        .setTitle(query)
        .setColor(0x00AE86)
        .setDescription(definitions);
      message.channel.send(embed);
    } else {
      message.channel.send('No entry found.').catch(err => console.log(err));
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'urban',
  category: 'Miscelaneous',
  description: 'Searches the Urban Dictionary library for a definition to the search term.',
  usage: '<search:str> [resultNum:int]',
};
