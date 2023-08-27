const { Client, GatewayIntentBits, Partials, Collection } = require("discord.js");
const { Guilds, GuildMembers, GuildMessages  } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

const client = new Client({
    intents: 3276799,
    partials: [ User, Message, GuildMember, ThreadMember ]
});

const { loadEvents } = require("./Handlers/eventHandler");

client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();
client.prefixs = new Collection();
client.buttons = new Collection();

loadEvents(client);

require(`./Handlers/anti-crash`)(client);
require(`./Handlers/logs`)(client);

client.login(client.config.token);

    //PRUEBAS: MTE0NTQ3NjA3MTA0NzgyMzM3MA.G-VKb2.V6mWj-7ylBI-5EoiIyhDzL4JC1kLyoTI-KS6YM
    //ORIGINAL: MTExMTc5NDIwMDI4ODE3ODIyNw.Gdvjyc.SZ6TWa0G8eUE8skcwIOScjLlsMTbR1mMOJNJcc