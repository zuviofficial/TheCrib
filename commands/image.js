require('dotenv').config();
var Scrapper = require('images-scraper');

const google = new Scrapper({
    puppeteer: {
        headless: true,
    },
});

module.exports = {
    name: 'image',
    aliases: ['image-search', 'search'],
    permissions: [],
    cooldown: 0,
    description: 'Try finding images on the internet!',
    async execute(message, args, cmd, client, Discord) {
        const imageQuery = args.join(' ');
        let guildIcon = message.guild.iconURL();
        let imgSearch = new Discord.MessageEmbed()
            .setAuthor(`The Crib`, `${guildIcon}`)
            .setColor("#FFA500")
            .addFields(
                { name: '<:disapprove:817293197792641035> Invalid Search.', value: `Please type a valid search result!` },
                { name: 'Example:', value: `\`${process.env.prefix}image Monkey\`` }
            )
            .setTimestamp()
            .setFooter(`ERROR`)
        if (!imageQuery) return message.channel.send(imgSearch);

        message.channel.send(`<a:loading:817255166185046047> Fetching images with the Search: \`${imageQuery}\``).then(message => { message.delete({ timeout: 2850 }) });
        var random = Math.floor((Math.random() * 90) + 0);
        console.log(random)
        const results = await google.scrape(imageQuery, 100)
        const imageResults = results[random].url
        // message.channel.send(`Generating image from **\`${imageQuery}\`**.`).then(message => {message.delete({ timeout: 5000 })});
        let resultsEmbed = new Discord.MessageEmbed()
            .setColor("#FFA500")
            .setTitle(`<:approved:817293197877313536> Found an image with the Search: *${imageQuery}!*`)
            .setAuthor(`${message.author.username}`, `${message.author.avatarURL()}`)
            .setImage(imageResults)
            .setTimestamp()
            .setFooter(`Image found with the Search: ${imageQuery}!`)
        message.channel.send(resultsEmbed)
    }
};