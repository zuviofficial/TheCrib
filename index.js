const Discord = require('discord.js');
const fs = require('fs');
require ('dotenv').config();

const client = new Discord.Client();

client.commands = new Discord.Collection();
client.events = new Discord.Collection();

['command_handler', 'event_handler'].forEach(handler =>{
    require(`./handlers/${handler}`)(client, Discord);
})

client.login(process.env.bot_token);