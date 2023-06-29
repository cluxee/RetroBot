const wiki = require("wikijs").default();
const { SlashCommandBuilder, EmbedBuilder, PermissionsBitField } = require("discord.js");

var timeout = [];

module.exports = {
    data: new SlashCommandBuilder()
    .setName('wikipedia')
    .setDMPermission(false)
    .setDescription('Busca información en la Wikipedia.')
    .addStringOption(option => 
        option.setName('busqueda')
            .setDescription('Realiza tu pregunta.')
            .setRequired(true)
            .setMaxLength(200)
    ),

    async execute(interaction) {
        const busqueda = interaction.options.getString('busqueda');

        if(!interaction.member.permissions.has(PermissionsBitField.Flags.Administrator) && timeout.includes(interaction.member.id) && interaction.user.id !== '929903731351375922') return await interaction.reply({ content: 'En este momento **NO** puedes utilizar el comando: **/wiki**', ephemeral: true})
        
        await interaction.deferReply();

        timeout.push(interaction.user.id);
        setTimeout(() => {
            timeout.shift();
        }, 10000)

        const busquedad = await wiki.search(busqueda);
        if(!busquedad.results.length) return await interaction.editReply({ content: '> Hey, no encontré un resultado intentá ser más claro...', ephemeral: true });

        const resultado = await wiki.page(busquedad.results[0]);

        const resumen = await resultado.summary();

        const embed = new EmbedBuilder()
        .setTitle(`La búsqueda ${resultado.raw.title} fue enviada.`)
        .setAuthor({ name: ('📰 ¡Wiki ha encontrado resultados potenciales!')})
        .addFields({ name: `• Resultados de wiki`, value: `${resumen.slice( 0, 1021)}...`})
        .setFooter({ text: ('• Busqueda completa.')})
        .setColor('#6f00ff')
        .setThumbnail('https://cdn.discordapp.com/attachments/1069421539457503355/1112164624675131473/918194cf363e75f01ba729ab5379ecc2.jpg')
        .setTimestamp()

        await interaction.editReply({ embeds: [embed], ephemeral: false});
    }
}