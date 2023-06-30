const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, Client, EmbedBuilder } = require("discord.js");
const { loadCommands } = require("../../Handlers/commandHandler");
const { loadEvents } = require("../../Handlers/eventHandler");
const { loadButtons } = require("../../Handlers/buttonHandler");
const { loadPrefixs } = require("../../Handlers/prefixHandler")

module.exports = {
    developer: true,
    data: new SlashCommandBuilder()
    .setName(`reload`)
    .setDescription(`Recarga el bot.`)
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) => options.setName(`events`).setDescription(`Recarga tus eventos`))
    .addSubcommand((options) => options.setName(`commands`).setDescription(`Recarga tus comandos`))
    .addSubcommand((options) => options.setName(`buttons`).setDescription(`Recarga tus botones`))
    .addSubcommand((options) => options.setName(`cmdsprefix`).setDescription(`Recarga tus comandos de prefix`)),

    /**
     * 
     * @param {ChatInputCommandInteraction} interaction 
     * @param {Client} client 
     */

    execute(interaction, client) {
        const subCommand = interaction.options.getSubcommand();

        switch (subCommand) {
            case "events": {
                for(const [key, value] of client.events)
                client.removeListener(`${key}`, value, true);
                loadEvents(client);

                const embed = new EmbedBuilder()
                .setTitle("Events Reload")
                .setDescription("Los eventos han sido recargados correctamente. 🟩")
                .setTimestamp()
                .setColor("#6f00ff")
                .setThumbnail()
                interaction.reply({ embeds: [embed], ephemeral: true })
            }
                break;
            
            case "commands": {
                loadCommands(client);
                const embed2 = new EmbedBuilder()
                .setTitle("Commands Reload")
                .setDescription("Los comandos han sido recargados correctamente. 🟩")
                .setTimestamp()
                .setColor("#6f00ff")
                interaction.reply({ embeds: [embed2], ephemeral: true })
            }
                break;
            case "buttons": {
                    loadButtons(client);
                    const embed3 = new EmbedBuilder()
                    .setTitle("Buttons Reload")
                    .setDescription("Los botones han sido recargados correctamente. 🟩")
                    .setTimestamp()
                    .setColor("#6f00ff")
                    interaction.reply({ embeds: [embed3], ephemeral: true })
            }
                break;
            case "cmdsprefix": {
                    loadPrefixs(client);
                    const embed4 = new EmbedBuilder()
                    .setTitle("Commands Prefix Reload")
                    .setDescription("Los comandos de prefix han sido recargados correctamente. 🟩")
                    .setTimestamp()
                    .setColor("#6f00ff")
                    interaction.reply({ embeds: [embed4], ephemeral: true })
            }
                break;
        }
    },
};

