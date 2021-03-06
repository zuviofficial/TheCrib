module.exports = {
    name: 'help',
    aliases: [],
    permissions: [],
    cooldown: 0,
    description: 'List all available commands.',
    execute(message,args, cmd, client, Discord){
        let str = '';
        const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('js'));

        for(const file of commandFiles) {
            const command = require(`./${file}`);
            str += `Name: ${command.name}, Description: ${command.description} \n`
        }

        message.channel.send(str);
    },
};