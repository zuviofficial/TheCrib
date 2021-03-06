require('dotenv').config();

module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'Sends the user information about the bot!',
    async execute(message, args, cmd, client, Discord) {
        let guildIcon = message.guild.iconURL();
        let helpEmbed = new Discord.MessageEmbed()
            .setAuthor(`The Crib`, `${guildIcon}`)
            .setColor("#FFA500")
            .addFields(
                { name: 'Prefix', value: `\`${process.env.prefix}\`\nThis is the prefix used to perform commands!` },
                { name: `\u200B`, value: `⏬` },
                { name: 'Commands:', value: 'List of commands!' },
                { name: `${process.env.prefix}help`, value: `Send's the user information about the bot!\n**Usage**: \`${process.env.prefix}help\`` },
                { name: `${process.env.prefix}image`, value: `Send's the user a random image from the Internet!\n**Usage**: \`${process.env.prefix}image Apple\`` },
                { name: `\u200B`, value: `⏬` },
                { name: 'Commands (Moderation):', value: 'List of Moderation commands' },
                { name: `${process.env.prefix}clear`, value: `Clears the specific channel you are in.\n**Usage**: \`${process.env.prefix}clear 50\`` },
                { name: `${process.env.prefix}whois`, value: `Send's the user Information about the user mentioned.\n**Usage**: \`${process.env.prefix}whois @user\`` },
            )
            .setTimestamp()
            .setFooter(`SUCCESS`)
        message.channel.send(helpEmbed);
    },
};