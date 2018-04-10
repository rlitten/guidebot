const request = require("request");

exports.run = async (client, message, [search, resultNum]) => {
  const baseUrl = "http://api.urbandictionary.com/v0/define?term=";
  const theUrl = baseUrl + search;
  request({
    url: theUrl,
    json: true,
  }, (error, response, body) => {
    if (!resultNum) {
      resultNum = 0;
    } else if (resultNum > 1) {
      resultNum -= 1;
    }
    const result = body.list[resultNum];
    if (result) {
      const definition = [
        `**Word:** ${search}`,
        "",
        `**Definition:** ${resultNum += 1} out of ${body.list.length}\n_${result.definition}_`,
        "",
        `**Example:**\n${result.example}`,
        `<${result.permalink}>`,
      ];
      message.channel.send(definition).catch(err => client.funcs.log(err.stack, "error"));
    } else {
      message.channel.send("No entry found.").catch(err => client.funcs.log(err.stack, "error"));
    }
  });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "urban",
  category: "Miscelaneous",
  description: "Searches the Urban Dictionary library for a definition to the search term.",
  usage: "<search:str> [resultNum:int]"
};