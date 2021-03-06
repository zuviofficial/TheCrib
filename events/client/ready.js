const { Presence } = require("discord.js");

module.exports = (Discord, client) => {
    
    console.log(`The Crib BOT | READY!`);

    client.user.setPresence({
        activity: {
            name: `The Crib | -help 🤖`,
            type: "WATCHING",
        },
        status: 'dnd'
    })
}