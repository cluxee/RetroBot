const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
    name: "interactionCreate",
    /**
     * 
     * @param { ChatInputCommandInteraction } interaction 
     */
    execute(interaction, client) {
        if (!interaction.isChatInputCommand()) return;

        const command = client.commands.get(interaction.commandName);
        if (!command)
        return interaction.reply({
            content: "This command is outdated.",
            ephemeral: true,
        });

        if (command.developer && interaction.user.id !== "929903731351375922") //ID del developer
        return interaction.reply({
            content: "Este comando es solo para el developer.",
            ephemeral: true,
        });

        command.execute(interaction, client);
    }
}