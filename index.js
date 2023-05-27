const { Client } = require("discord.js");
const client = new Client({intents: [131071]});

client.config = require("./config.json");

client.login(client.config.token).then(() => {
    console.log(`Cliente ${client.user.username} se ha iniciado.`);
    client.user.setActivity(`Die`);
}).catch((err) => console.log(err));