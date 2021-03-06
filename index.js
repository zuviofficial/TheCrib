const Discord = require('discord.js');
const fs = require('fs');
const keepAlive = require('./server.js');

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

keepAlive();
client.login(process.env.bot_token);