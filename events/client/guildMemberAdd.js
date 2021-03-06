const moment = require('moment');

module.exports = (Discord, client, message) => {

    let guildIcon = message.guild.iconURL();
    client.on('guildMemberAdd', async(member) => {
        let channelID = process.env.channelID;

        if(member.guild.id !== process.env.guildID) return;

        let onJoin = new Discord.MessageEmbed()
            .setAuthor(`The Crib`, `${guildIcon}`)
            .setTitle(`Member Joined!`)
            .setThumbnail(`${member.user.avatarURL({dynamic: true, size: 2048})}`)
            .setDescription(`<@!${member.user.id}>`)
            .addFields(
                { name: `Joined`, value: `${moment(member.joinedTimestamp).format('LLL')}`, inline: true },
                { name: `Registered`, value: `${moment(member.user.createdTimestamp).format('LLL')}`, inline: true },
            )
            .setColor("#FFA500")
            .setTimestamp()
            .setFooter(`ID: ${member.user.id}`)
            client.channels.cache.get(channelID).send(onJoin)
            member.roles.add(process.env.roleID);
    })
} 