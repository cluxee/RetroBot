const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("dados")
    .setDescription("Tira los dados 🎲"),

    async execute(interaction, client) {
        
        const dados = [
            "1",
            "2",
            "3",
            "4",
            "5",
            "6",
        ];

        const dadosR = dados [Math.floor(Math.random() * dados.length)];

        const embed = new EmbedBuilder()
        .setAuthor({ name: `${interaction.user.username} ha tirados los dados`, iconURL: interaction.user.avatarURL({ dynamic: true })})
        .addFields(
          {name: '🎲 - Dados:', value: `\`\`\`${dadosR}\`\`\``},
        )
        .setColor('#6f00ff')
        .setFooter({ text: `${interaction.guild.name}`, iconURL: client.user.avatarURL({ dynamic: true}) })
        .setTimestamp()

        await interaction.reply({ embeds: [embed] })
    }
}