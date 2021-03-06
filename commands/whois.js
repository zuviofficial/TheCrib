const moment = require('moment');
require ('dotenv').config();

module.exports = {
    name: 'whois',
    aliases: [],
    permissions: ["ADMINISTRATOR"],
    cooldown: 0,
    description: 'Who is this person? I DONT KNOW!',
    async execute(message, args, cmd, client, Discord) {
        const target = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.guild.members.fetch());

        let mentionedMember = message.mentions.members.first() || message.member;

        //#region Roles
        const roles = mentionedMember.roles.cache
        .sort((a, b) => b.position - a.position)
        .map(role => role.toString())
        .slice(0, -1);

        let displayRoles;
        if(roles.length < 20){
            displayRoles = roles.join(', ')
        }else{
            displayRoles = roles.slice(20),join(', ')
        }
        if(roles.length < 1) displayRoles = `None`
        //#endregion Roles

        let guildIcon = message.guild.iconURL();
        let whoisErr = new Discord.MessageEmbed()
            .setAuthor(`The Crib`, `${guildIcon}`)
            .setColor("#FFA500")
            .addFields(
                { name: '<:disapprove:817293197792641035> Unable to find that user!', value: `Please mention the user you want to view.` },
                { name: 'Example:', value: `\`${process.env.prefix}whois @user\`` }
            )
            .setTimestamp()
            .setFooter(`ERROR`)
        if(message.author.bot) return;
        if (!target) return message.channel.send(whoisErr);
        else {
            const whois = new Discord.MessageEmbed()
                .setColor("#FFA500")
                .setAuthor(`${target.user.tag}`, `${target.user.avatarURL()}`)
                .setDescription(`<@!${message.member.id}>`)
                .setThumbnail(`${target.user.displayAvatarURL({dynamic: true, size: 2048})}`)
                .addFields(
                    { name: `Joined`, value: `${moment(target.joinedTimestamp).format('LLL')}`, inline: true },
                    { name: `Registered`, value: `${moment(target.user.createdTimestamp).format('LLL')}`, inline: true },
                    { name: `Roles [${roles.length}]`, value: `${displayRoles}`, inline: false },
                    // { name: `<:approved:817293197877313536> Found user: ${target.user.username}!`, value: `We found some information on ${target.user.username}` },
                )
                .setTimestamp()
                .setFooter(`ID: ${target.user.id}`)
            message.channel.send(whois);
        };
    },
};