const { SlashCommandBuilder } = require('@discordjs/builders');
const { EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Borra una cantidad de mensajes especificos.')
        .addIntegerOption(option =>
            option.setName('cantidad')
                .setDescription('Número de mensajes a borrar.')
                .setRequired(true)),
    async execute(interaction) {

        if (!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            const embed = new EmbedBuilder()
            .setColor("#6f00ff")
            .setTitle("Error")
            .setDescription("🤨 ¿Qué intentas hacer?, no tienes los permisos suficientes.")
            return await interaction.reply({ embeds: [embed], ephemeral: true });
        }

        const cantidad = interaction.options.getInteger('cantidad');

        if (cantidad < 1 || cantidad > 99) {
            const errorEmbed = new EmbedBuilder()
                .setColor('#6f00ff')
                .setDescription('🤨 Ingresa un número, entre 1 y 99.')
            return interaction.reply({ embeds: [errorEmbed], ephemeral: true });
        }

        const messages = await interaction.channel.bulkDelete(cantidad, true);

        const embed = new EmbedBuilder()
            .setColor('#6f00ff')
            .setDescription(`✅ | Se han borrado ${messages.size} mensajes.`);

        if (messages.size < cantidad) {
            embed.setDescription('😒 No puedo borrar mensajes antiguos a 14 días.');
        }

        await interaction.reply({ embeds: [embed], ephemeral: true });
    },
};
