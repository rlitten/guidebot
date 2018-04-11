exports.run = async (client, message, args, level) => { // eslint-disable-line no-unused-vars
  await message.channel.send('Cooling down');
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 'User',
};

exports.help = {
  name: 'cooldown',
  category: 'Miscelaneous',
  description: 'Chill out bitch!',
  usage: 'cooldown',
};
