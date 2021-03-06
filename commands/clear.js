module.exports = {
    name: 'clear',
    aliases: ['c', 'delete'],
    permissions: ["ADMINISTRATOR"],
    cooldown: 0,
    description: 'Clear messages.',
    async execute(message, args, cmd, client, Discord) {
        let guildIcon = message.guild.iconURL();
        try {
            let numPick = new Discord.MessageEmbed()
                .setAuthor(`The Crib`, `${guildIcon}`)
                .setColor("#FFA500")
                .addFields(
                    { name: '<:disapprove:817293197792641035> Choose how much you want to delete!', value: 'Please enter how many messages you want to remove from this current channel!' },
                    { name: 'Clear  Minimum', value: '\`1\`', inline: true },
                    { name: 'Clear  Maximum', value: '\`100\`', inline: true },
                    { name: 'Example:', value: '\`-clear 50\`' }
                )
                .setTimestamp()
                .setFooter(`ERROR`)
            if (!args[0]) return message.channel.send(numPick);
            let numNaN = new Discord.MessageEmbed()
                .setAuthor(`The Crib`, `${guildIcon}`)
                .setColor("#FFA500")
                .addFields(
                    { name: '<:disapprove:817293197792641035> Choose an actual number!', value: `\`${args[0]}\` is not an actual number.\nPlease choose a number from \`1-100\`` },
                    { name: 'Clear  Minimum', value: '\`1\`', inline: true },
                    { name: 'Clear  Maximum', value: '\`100\`', inline: true },
                    { name: 'Example:', value: '\`-clear 50\`' }
                )
                .setTimestamp()
                .setFooter(`ERROR`)
            if (isNaN(args[0])) return message.channel.send(numNaN);
            let numMore = new Discord.MessageEmbed()
                .setAuthor(`The Crib`, `${guildIcon}`)
                .setColor("#FFA500")
                .addFields(
                    { name: '<:disapprove:817293197792641035> Unable to delete 100+ messages!', value: `You can't delete more than \`${args[0]}\` message(s) at a time.` },
                    { name: 'Clear  Minimum', value: '\`1\`', inline: true },
                    { name: 'Clear  Maximum', value: '\`100\`', inline: true },
                    { name: 'Example:', value: '\`-clear 50\`' }
                )
                .setTimestamp()
                .setFooter(`ERROR`)
            if (args[0] > 100) return message.channel.send(numMore);
            let numLess = new Discord.MessageEmbed()
                .setAuthor(`The Crib`, `${guildIcon}`)
                .setColor("#FFA500")
                .addFields(
                    { name: '<:disapprove:817293197792641035> Unable to delete any message(s)!', value: `You have to delete at least one message.` },
                    { name: 'Clear  Minimum', value: '\`1\`', inline: true },
                    { name: 'Clear  Maximum', value: '\`100\`', inline: true },
                    { name: 'Example:', value: '\`-clear 50\`' }
                )
                .setTimestamp()
                .setFooter(`ERROR`)
            if (args[0] < 1) return message.channel.send(numLess);

            await message.channel.messages.fetch({ limit: args[0] }).then(messages => {
                message.channel.bulkDelete(messages, true);
                let bulkdelEmbed = new Discord.MessageEmbed()
                    .setColor("#FFA500")
                    .addFields(
                        { name: '<:approved:817293197877313536> Deleted!', value: `Message(s) were deleted!` },
                        { name: 'Channel', value: `${message.channel}`, inline: true },
                        { name: 'Deleted', value: `\`${args[0]}\``, inline: true }
                    )
                    .setAuthor(`The Crib`, `${guildIcon}`)
                    .setTimestamp()
                    .setFooter(`SUCCESS`)
                message.channel.send(bulkdelEmbed);
            });
        } catch (err) {
            console.log(err);
        }
    }
};

// This is still a work in progress.
// Working on finding a bypass to the 14 day delete threashold.