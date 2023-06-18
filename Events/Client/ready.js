const { loadCommands } = require("../../Handlers/commandHandler");
const { loadPrefixs } = require("../../Handlers/prefixHandler")
const { ActivityType } = require("discord.js")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        const time = (200*5);

        let status = [
            [{
                name: "Die",
                type: ActivityType.Playing
            }],
            [{
                name: "RetroKode",
                type: ActivityType.Watching
            }]
        ];
        setInterval(() => {
            function randomStatus() {
                let astatus = status[Math.floor(Math.random() * status.length)];
                client.user.setPresence({ activities: astatus, status: "dnd" });
            }
        randomStatus();
        }, time)

        console.log("[RetroBot]: ¡Ha iniciado correctamente!");

        loadCommands(client);
        loadPrefixs(client);
    },
};