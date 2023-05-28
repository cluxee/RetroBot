const { loadCommands } = require("../../Handlers/commandHandler");

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("[RetroBot]: ¡Ha iniciado correctamente!");

        loadCommands(client);
    },
};