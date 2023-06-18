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