const { loadCommands } = require("../../Handlers/commandHandler");
const { loadPrefixs } = require("../../Handlers/prefixHandler")

module.exports = {
    name: "ready",
    once: true,
    execute(client) {
        console.log("[RetroBot]: ¡Ha iniciado correctamente!");

        loadCommands(client);
        loadPrefixs(client);
    },
};