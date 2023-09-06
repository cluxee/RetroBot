const { ChatInputCommandInteraction, EmbedBuilder, SlashCommandBuilder  } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
    .setName("anuncio")
    .setDescription("Crea un anuncio administrativo.")
    .setDMPermission(false)
    .addStringOption(option => 
        option.setName("titulo")
        .setDescription("Establece un titulo a este anuncio")
        .setRequired(true))   
    .addStringOption(option => option.setName("mensaje").setDescription("mensaje").setRequired(true)),

    /**
     * @param { ChatInputCommandInteraction } interaction
     */

    execute(interaction) {

        const titulo = interaction.options.getString("titulo");
        const mensaje = interaction.options.getString("mensaje");

        const embed = new EmbedBuilder()

        .setTitle("> ANUNCIO 📌")
        .setDescription(`
        # ${titulo}

        ${mensaje}`)
        .setColor("#6f00ff")
        .setTimestamp()
        .setThumbnail("https://cdn.discordapp.com/attachments/1135758529626644480/1148998098639667230/d4d76158-b1ae-4d94-a0f4-f0f04910fa74.gif")
        .setFooter({ text: "Administración RetroKode"})


        interaction.reply({ embeds: [embed] })

    }
}