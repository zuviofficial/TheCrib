const moment = require('moment');

module.exports = (Discord, client, message) => {

    let guildIcon = message.guild.iconURL();
    client.on('guildMemberRemove', async(member) => {
        let channelID = process.env.channelID;

        if(member.guild.id !== process.env.guildID) return;

        let onLeave = new Discord.MessageEmbed()
            .setAuthor(`The Crib`, `${guildIcon}`)
            .setTitle(`Member Left!`)
            .setThumbnail(`${member.user.avatarURL({dynamic: true, size: 2048})}`)
            .setDescription(`<@!${member.user.id}>`)
            .addFields(
                { name: `Farewell`, value: `Farewell <@!${member.user.id}>. We hope to see you again soon!`, inline: true },
            )
            // .addFields(
            //     { name: `Joined`, value: `${moment(member.joinedTimestamp).format('LLL')}`, inline: true },
            //     { name: `Registered`, value: `${moment(member.user.createdTimestamp).format('LLL')}`, inline: true },
            // )
            .setColor("#FFA500")
            .setTimestamp()
            .setFooter(`ID: ${member.user.id}`)
            client.channels.cache.get(channelID).send(onLeave)
    })
} 